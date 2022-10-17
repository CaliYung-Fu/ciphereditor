
import z from 'zod'
import { serializedValueSchema, valueSchema } from '../value/schema'

/**
 * Control visibility states
 */
export type ControlVisibility = z.infer<typeof controlVisibilitySchema>
export const controlVisibilitySchema = z.enum([
  'collapsed',
  'expanded',
  'hidden'
])

/**
 * Operation control entity
 */
export type Control = z.infer<typeof controlSchema>
export const controlSchema = z.object({
  /**
   * Control name unique within the parent operation or program
   */
  name: z.string(),

  /**
   * Control label
   * Defaults to the capitalized name of the control
   */
  label: z.string().optional(),

  /**
   * Control description
   */
  description: z.string().optional(),

  /**
   * Accepted control value types
   */
  types: z.array(z.string()),

  /**
   * Initial control value
   */
  initialValue: serializedValueSchema,

  /**
   * Value control options
   */
  options: z.array(z.object({
    value: serializedValueSchema,
    label: z.string()
  })).optional(),

  /**
   * Wether the value is restricted to the given options (if not empty)
   * Defaults to true
   */
  enforceOptions: z.boolean().optional(),

  /**
   * Control enabled state
   * Defaults to true
   */
  enabled: z.boolean().optional(),

  /**
   * Wether a new value can be set from outside this control's parent
   * Defaults to true
   */
  writable: z.boolean().optional(),

  /**
   * Wether to mask the preview of this control (e.g. for passwords)
   */
  maskPreview: z.boolean().optional(),

  /**
   * Initial control visibility
   * Defaults to `collapsed`
   */
  initialVisibility: controlVisibilitySchema.optional(),

  /**
   * The order number by which controls are ordered within their parent in
   * ascending order. Order numbers 1000 or larger are placed below the header.
   */
  order: z.number().optional()
})

/**
 * Changes resulting from an operation execution
 */
export type ControlChange = z.infer<typeof controlChangeSchema>
export const controlChangeSchema = z.object({
  /**
   * Name uniquely identifying a control within the parent operation or program
   */
  name: z.string(),

  /**
   * New label, if changing
   */
  label: z.string().optional(),

  /**
   * New value, if changing
   */
  value: valueSchema.optional(),

  /**
   * New value options, if changing
   */
  options: z.array(z.object({
    value: valueSchema,
    label: z.string()
  })).optional(),

  /**
   * New enabled state, if changing
   */
  enabled: z.boolean().optional(),

  /**
   * New order value, if changing
   */
  order: z.number().optional()
})
