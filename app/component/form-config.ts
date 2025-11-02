// Form configuration system - maps form IDs to their field definitions
export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "tel" | "textarea" | "select"
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

export interface FormDefinition {
  id: number
  fields: FormField[]
}

export const FORM_DEFINITIONS: FormDefinition[] = [
  {
    id: 0,
    fields: [
      { name: "fullName", label: "Full Name", type: "text", placeholder: "Your name", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
      { name: "message", label: "Message", type: "textarea", placeholder: "Tell us about your needs", required: true },
    ],
  },
  {
    id: 1,
    fields: [
      { name: "fullName", label: "Full Name", type: "text", placeholder: "Your name", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
      { name: "whatsapp", label: "WhatsApp Number", type: "tel", placeholder: "+1 (555) 000-0000", required: true },
      {
        name: "needs",
        label: "What do you need?",
        type: "select",
        required: true,
        options: [
          { value: "website-development", label: "Website Development" },
          { value: "website-optimization", label: "Website Optimization" },
          { value: "website-security", label: "Website Security" },
          { value: "website-security", label: "Search Enging Optimization" },
          { value: "website-security", label: "Ads" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "platform",
        label: "Preferred Platform",
        type: "select",
        required: true,
        options: [
          { value: "wordpress", label: "WordPress" },
          { value: "nextjs", label: "Next.js" },
          { value: "duda", label: "Duda" },
          { value: "shopify", label: "Shopify" },
          { value: "hubspot", label: "HubSpot" },
          { value: "odoo", label: "Odoo" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "budget",
        label: "Budget",
        type: "select",
        required: true,
        options: [
          { value: "under-100", label: "Under $100" },
          { value: "100-1000", label: "$100 - $1,000" },
          { value: "1000-5000", label: "$1,000 - $5,000" },
          { value: "more-5000", label: "More than $5,000" },
        ],
      },
      {
        name: "description",
        label: "Describe your needs",
        type: "textarea",
        placeholder: "Tell us more about your project",
        required: true,
      },
    ],
  },
]

export function getFormDefinition(id: number): FormDefinition | undefined {
  return FORM_DEFINITIONS.find((form) => form.id === id)
}
