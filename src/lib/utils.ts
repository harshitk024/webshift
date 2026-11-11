type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, unknown>

function collectClassNames(value: ClassValue, output: string[]) {
  if (!value) return

  if (typeof value === 'string' || typeof value === 'number') {
    output.push(String(value))
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectClassNames(item, output))
    return
  }

  Object.entries(value).forEach(([name, enabled]) => {
    if (enabled) output.push(name)
  })
}

export function cn(...values: ClassValue[]) {
  const classes: string[] = []
  values.forEach((value) => collectClassNames(value, classes))
  return classes.join(' ')
}
