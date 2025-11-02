import Button from "./Button"
import { getFormDefinition, type FormField } from "./form-config"
import Input from "./ui/input"
import Select from "./ui/select"

interface FormProps {
  formId: number
}

export default function Form({ formId }: FormProps) {
  const formDef = getFormDefinition(formId)

  if (!formDef) {
    return <div className="text-red-500">Form not found</div>
  }

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "textarea":
        return (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            type="textarea"
            placeholder={field.placeholder}
            required={field.required}
          />
        )

      case "select":
        return (
          <Select
            key={field.name}
            name={field.name}
            placeholder={`Select ${field.label.toLowerCase()}`}
            options={field.options || []}
            required={field.required}
          />
        )

      case "text":
      case "email":
      case "tel":
        return (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
          />
        )

      default:
        return (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            type="text"
            placeholder={field.placeholder}
            required={field.required}
          />
        )
    }
  }

  return (
    <form action="https://formsubmit.co/68d554ed24003a26b10a708a81de646e" method="POST" className="space-y-6">
      {formDef.fields.map((field) => (
        <div key={field.name}>{renderField(field)}</div>
      ))}

      <Button type="submit" label="Send" showIcon={false} />
    </form>
  )
}
