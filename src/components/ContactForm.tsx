import { useState, type FormEvent } from 'react'
import { mailtoHref, projectTypes, site } from '../config/site'

type Fields = {
  name: string
  business: string
  email: string
  phone: string
  type: string
  description: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const empty: Fields = {
  name: '',
  business: '',
  email: '',
  phone: '',
  type: projectTypes[0],
  description: '',
}

// Public access key from web3forms.com (safe to expose in frontend code).
// Set VITE_WEB3FORMS_KEY in .env.local and in Vercel → Settings → Environment Variables.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }))
    if (status !== 'sending') setStatus('idle')
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = 'Add your name.'
    if (!fields.business.trim()) next.business = 'Add the business name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = 'Enter a valid email.'
    if (fields.description.trim().length < 12) {
      next.description = 'Say a little about the project — a sentence is enough.'
    }
    setErrors(next)
    if (Object.keys(next).length > 0) return

    // Honeypot: real visitors never tick this hidden box, bots usually do.
    const honeypot = (event.currentTarget.elements.namedItem('botcheck') as HTMLInputElement | null)
      ?.checked
    if (honeypot) return

    if (!ACCESS_KEY) {
      setStatus('error')
      setErrorMessage(
        `The form isn't connected yet. Please email ${site.contact.email} directly.`,
      )
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Project enquiry — ${fields.business}`,
          from_name: 'Webshift website',
          // "email" is used by Web3Forms as the reply-to address
          name: fields.name,
          email: fields.email,
          business: fields.business,
          phone: fields.phone || '—',
          project_type: fields.type,
          message: fields.description,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setStatus('success')
        setFields(empty)
        setErrors({})
      } else {
        setStatus('error')
        setErrorMessage(
          result?.message ||
            `Something went wrong. Please email ${site.contact.email} directly.`,
        )
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        `Couldn't reach the server. Check your connection or email ${site.contact.email} directly.`,
      )
    }
  }

  const inputClass =
    'mt-2 w-full border-b border-ink-line bg-transparent py-3 text-foam outline-none placeholder:text-mist/70 focus:border-lime'

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot (hidden from people, visible to bots) */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm text-mist">
          Name
          <input
            className={inputClass}
            value={fields.name}
            onChange={(event) => update('name', event.target.value)}
            autoComplete="name"
          />
          {errors.name && <span className="mt-1 block text-xs text-lime">{errors.name}</span>}
        </label>
        <label className="block text-sm text-mist">
          Business name
          <input
            className={inputClass}
            value={fields.business}
            onChange={(event) => update('business', event.target.value)}
            autoComplete="organization"
          />
          {errors.business && (
            <span className="mt-1 block text-xs text-lime">{errors.business}</span>
          )}
        </label>
        <label className="block text-sm text-mist">
          Email
          <input
            type="email"
            className={inputClass}
            value={fields.email}
            onChange={(event) => update('email', event.target.value)}
            autoComplete="email"
          />
          {errors.email && <span className="mt-1 block text-xs text-lime">{errors.email}</span>}
        </label>
        <label className="block text-sm text-mist">
          Phone
          <input
            type="tel"
            className={inputClass}
            value={fields.phone}
            onChange={(event) => update('phone', event.target.value)}
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="block text-sm text-mist">
        Type of project
        <select
          className={`${inputClass} appearance-none`}
          value={fields.type}
          onChange={(event) => update('type', event.target.value)}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-graphite text-foam">
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-mist">
        Project description
        <textarea
          rows={5}
          className={`${inputClass} resize-y`}
          value={fields.description}
          onChange={(event) => update('description', event.target.value)}
        />
        {errors.description && (
          <span className="mt-1 block text-xs text-lime">{errors.description}</span>
        )}
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center bg-lime px-5 py-3 text-sm font-medium text-graphite transition-opacity hover:bg-lime-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <a
          href={mailtoHref()}
          className="text-sm text-mist underline-offset-4 hover:text-foam hover:underline"
        >
          Or email {site.contact.email} directly
        </a>
      </div>

      {status === 'success' && (
        <p
          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-lime"
          role="status"
        >
          Thanks — your message has been sent. We'll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </form>
  )
}