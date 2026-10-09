import Icon from '../Icon.jsx'
import type { RegistrationFormApi } from '../../hooks/useRegistrationForm.js'
import {
  cardCaptionClassName,
  cardClassName,
  cardTitleClassName,
  chevronWrapperClassName,
  errorInputClassName,
  errorTextClassName,
  fieldId,
  helperClassName,
  labelClassName,
  numberBadgeClassName,
    requiredClassName,
  selectClassName,
} from '../../lib/registrationStyles.js'

/**
 * Tahap 1 — Informasi Lomba.
 * Cabang lomba tidak dapat dipilih: nilainya dikunci dari route halaman.
 */
export default function CompetitionSection({ form }: { form: RegistrationFormApi }) {
  const { config, valueFor, setValue, errorFor, selectClassFor } = form
  const extraFields = config.specificFields.filter((field) => field.name !== config.categoryFieldName)

  return (
    <section className={cardClassName}>
      <div className="flex items-center justify-between pb-space-sm mb-space-md">
        <div className="flex items-center gap-space-sm">
          <span className={numberBadgeClassName}>01</span>
          <div>
            <h2 className={cardTitleClassName}>Informasi Lomba</h2>
            <p className={cardCaptionClassName}>
              Silakan lengkapi formulir pendaftaran untuk cabang lomba ini.
            </p>
          </div>
        </div>
        
      </div>

      <input name="competition_id" type="hidden" value={config.competitionId} readOnly />
      <input name="competition_slug" type="hidden" value={config.slug} readOnly />

      <div className="rounded-xl p-space-md bg-surface-container-low border border-border-ui">
        <div className="flex items-start justify-between mb-space-sm">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.iconClassName}`}>
            <Icon className="text-[22px]" name={config.icon} />
          </div>
          
        </div>
        <div className="font-title-md text-title-md text-on-surface mb-1">{config.fullName}</div>
        <p className="font-caption text-caption text-on-surface-variant">{config.tagline}</p>
        <div className="mt-space-sm pt-space-xs flex items-center justify-between font-caption text-caption">
          <span className="text-primary font-body-md-semibold">{config.level}</span>
          
        </div>
      </div>

      {config.categories.length > 0 && (
        <div className="bg-surface-container-low p-space-md rounded-xl mt-space-md">
          <label className={labelClassName} htmlFor={fieldId(config.categoryFieldName)}>
            {config.categoryLabel} <span className={requiredClassName}>*</span>
          </label>
          <div className="relative">
            <select
              aria-describedby={`${fieldId(config.categoryFieldName)}-error`}
              className={selectClassFor(config.categoryFieldName)}
              id={fieldId(config.categoryFieldName)}
              name={config.categoryFieldName}
              onChange={(event) => setValue(config.categoryFieldName, event.target.value)}
              value={valueFor(config.categoryFieldName)}
            >
              <option value="">{config.categoryPlaceholder}</option>
              {config.categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className={chevronWrapperClassName}>
              <Icon className="text-[20px]" name="expand_more" />
            </div>
          </div>
          {errorFor(config.categoryFieldName) ? (
            <p className={errorTextClassName} id={`${fieldId(config.categoryFieldName)}-error`}>
              {errorFor(config.categoryFieldName)}
            </p>
          ) : (
            <p className="font-caption text-caption text-on-surface-variant mt-1.5 flex items-center gap-1">
              <Icon className="text-[15px] text-tertiary" name="info" />
              {config.categoryHelper}
            </p>
          )}
        </div>
      )}

      {extraFields.map((field) => (
        <div key={field.name}>
          <label className={labelClassName} htmlFor={fieldId(field.name)}>
            {field.label} <span className={requiredClassName}>*</span>
          </label>
          <div className="relative">
            <select
              aria-describedby={`${fieldId(field.name)}-error`}
              className={`${selectClassName} ${errorFor(field.name) ? errorInputClassName : ''}`.trim()}
              id={fieldId(field.name)}
              name={field.name}
              onChange={(event) => setValue(field.name, event.target.value)}
              value={valueFor(field.name)}
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className={chevronWrapperClassName}>
              <Icon className="text-[20px]" name="expand_more" />
            </div>
          </div>
          {errorFor(field.name) ? (
            <p className={errorTextClassName} id={`${fieldId(field.name)}-error`}>
              {errorFor(field.name)}
            </p>
          ) : (
            <p className={helperClassName}>{field.helper}</p>
          )}
        </div>
      ))}
    </section>
  )
}
