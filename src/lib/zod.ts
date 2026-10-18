import { z } from "zod"

// French default messages ("Nombre attendu", not "Invalid input: expected number, received NaN") for every schema
// that does not set its own. Import zod from here, never from "zod" directly.
z.config(z.locales.fr())

export { z }
