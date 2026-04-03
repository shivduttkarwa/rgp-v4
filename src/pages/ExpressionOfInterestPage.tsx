import { useEffect, useRef, useState, type FormEvent } from "react";
import HeroSection from "../sections/HeroSection";
import { initGsapSwitchAnimations } from "@/lib/gsapSwitchAnimations";
import "./ExpressionOfInterestPage.css";

type FieldType = "text" | "email" | "tel" | "number" | "textarea" | "select";

type FieldConfig = {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  full?: boolean;
  autoComplete?: string;
  options?: Array<{ label: string; value: string }>;
};

type FieldSection = {
  number: string;
  title: string;
  description: string;
  fields: FieldConfig[];
};

const YES_NO_OPTIONS = [
  { label: "Select an option", value: "" },
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const FORM_SECTIONS: FieldSection[] = [
  {
    number: "01",
    title: "Property Details",
    description:
      "Start with the property and the primary buyer details, matching the same information requested in the reference form.",
    fields: [
      {
        id: "propertyAddress",
        name: "property_address",
        label: "Property Address",
        type: "textarea",
        placeholder: "Property Address",
        required: true,
        rows: 3,
        full: true,
      },
      {
        id: "buyer1FullLegalName",
        name: "buyer_1_full_legal_name",
        label: "Buyer 1 - Full Legal Name:",
        type: "text",
        placeholder: "Buyer 1 - Full Legal Name",
        required: true,
        autoComplete: "name",
      },
      {
        id: "addressBuyer1",
        name: "address_buyer_1",
        label: "Address - Buyer 1",
        type: "textarea",
        placeholder: "Address - Buyer 1",
        required: true,
        rows: 3,
        full: true,
      },
      {
        id: "phoneBuyer1",
        name: "phone_buyer_1",
        label: "Phone - Buyer 1",
        type: "tel",
        placeholder: "Phone - Buyer 1",
        required: true,
        autoComplete: "tel",
      },
      {
        id: "emailBuyer1",
        name: "email_buyer_1",
        label: "Email - Buyer 1",
        type: "email",
        placeholder: "Email - Buyer 1",
        required: true,
        autoComplete: "email",
      },
    ],
  },
  {
    number: "02",
    title: "Second Buyer",
    description:
      "Include the optional secondary purchaser details exactly where needed.",
    fields: [
      {
        id: "buyer2FullLegalName",
        name: "buyer_2_full_legal_name",
        label: "Buyer 2 - Full Legal Name:",
        type: "text",
        placeholder: "Buyer 2 - Full Legal Name",
        autoComplete: "name",
      },
      {
        id: "addressBuyer2IfDifferentToBuyer1",
        name: "address_buyer_2_if_different_to_buyer_1",
        label: "Address - Buyer 2 (if different to Buyer 1)",
        type: "textarea",
        placeholder: "Address - Buyer 2 (if different to Buyer 1)",
        rows: 3,
        full: true,
      },
      {
        id: "phoneBuyer2",
        name: "phone_buyer_2",
        label: "Phone - Buyer 2",
        type: "tel",
        placeholder: "Phone - Buyer 2",
        autoComplete: "tel",
      },
      {
        id: "emailBuyer2",
        name: "email_buyer_2",
        label: "Email - Buyer 2",
        type: "email",
        placeholder: "Email - Buyer 2",
        autoComplete: "email",
      },
    ],
  },
  {
    number: "03",
    title: "Offer & Conditions",
    description:
      "Keep the commercial terms, finance, building and pest, and additional conditions all together for an easy review.",
    fields: [
      {
        id: "offerPrice",
        name: "offer_price",
        label: "Offer Price ($)",
        type: "number",
        placeholder: "Offer Price ($)",
        required: true,
      },
      {
        id: "initialDeposit",
        name: "initial_deposit",
        label: "Initial Deposit ($)",
        type: "number",
        placeholder: "Initial Deposit ($)",
        required: true,
      },
      {
        id: "balanceDeposit",
        name: "balance_deposit",
        label: "Balance Deposit ($)",
        type: "number",
        placeholder: "Balance Deposit ($)",
      },
      {
        id: "financeSubject",
        name: "will_your_offer_be_subject_to_finance",
        label: "Will your offer be subject to finance?",
        type: "select",
        required: true,
        options: YES_NO_OPTIONS,
      },
      {
        id: "financeDays",
        name: "finance_if_yes_how_many_days",
        label: "If yes, how many days?",
        type: "text",
        placeholder: "If yes, how many days?",
      },
      {
        id: "buildingPestSubject",
        name: "will_your_offer_be_subject_to_building_pest",
        label: "Will your offer be subject to Building & Pest",
        type: "select",
        options: YES_NO_OPTIONS,
      },
      {
        id: "buildingPestDays",
        name: "building_pest_if_yes_how_many_days",
        label: "If yes, how many days?",
        type: "text",
        placeholder: "If yes, how many days?",
      },
      {
        id: "otherConditions",
        name: "do_you_have_any_other_conditions_for_purchase",
        label: "Do you have any other conditions for purchase?",
        type: "select",
        options: YES_NO_OPTIONS,
        full: true,
      },
      {
        id: "otherConditionsDetails",
        name: "if_yes_please_state_brief_details",
        label: "If yes, please state brief details",
        type: "textarea",
        placeholder: "If yes, please state brief details",
        rows: 3,
        full: true,
      },
    ],
  },
  {
    number: "04",
    title: "Legal & Privacy",
    description:
      "Wrap up the same solicitor and database fields from the source form in a more polished finish.",
    fields: [
      {
        id: "solicitorDetails",
        name: "solicitor_details",
        label: "Solicitor Details",
        type: "textarea",
        placeholder: "Solicitor Details",
        required: true,
        rows: 3,
        full: true,
      },
      {
        id: "databasePermission",
        name: "are_you_happy_for_us_to_store_your_information_in_our_database",
        label: "Are you happy for us to store your information in our database?",
        type: "select",
        options: YES_NO_OPTIONS,
        full: true,
      },
    ],
  },
];

function Field({ field }: { field: FieldConfig }) {
  return (
    <div className={`eoi-field${field.full ? " eoi-field--full" : ""}`}>
      <label className="eoi-field__label" htmlFor={field.id}>
        <span>{field.label}</span>
        {field.required ? <span className="eoi-field__required">*</span> : null}
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          rows={field.rows ?? 4}
          className="eoi-field__control eoi-field__control--textarea"
        />
      ) : null}

      {field.type === "select" ? (
        <div className="eoi-select">
          <select
            id={field.id}
            name={field.name}
            required={field.required}
            defaultValue=""
            className="eoi-field__control eoi-field__control--select"
          >
            {field.options?.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {field.type !== "textarea" && field.type !== "select" ? (
        <input
          id={field.id}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          autoComplete={field.autoComplete}
          className="eoi-field__control"
        />
      ) : null}
    </div>
  );
}

export default function ExpressionOfInterestPage({
  ready = false,
}: {
  ready?: boolean;
}) {
  const pageRef = useRef<HTMLElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(() =>
    FORM_SECTIONS.map((section) => section.number),
  );

  useEffect(() => {
    const guards = [
      "clipRevealInit",
      "clipRevealRtlInit",
      "clipRevealTopInit",
      "clipRevealLeftInit",
      "clipRevealRightInit",
      "wordRevealInit",
      "wordWriteInit",
      "clipSmoothInit",
      "clipSmoothDownInit",
      "charRevealInit",
    ];

    guards.forEach((key) => {
      pageRef.current
        ?.querySelectorAll<HTMLElement>(
          `[data-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}]`,
        )
        .forEach((el) => delete el.dataset[key]);
    });

    const cleanup = initGsapSwitchAnimations(pageRef.current);
    return cleanup;
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(true);
  };

  const toggleSection = (sectionNumber: string) => {
    setOpenSections((current) =>
      current.includes(sectionNumber)
        ? current.filter((item) => item !== sectionNumber)
        : [...current, sectionNumber],
    );
  };

  return (
    <main className="eoi-page" ref={pageRef}>
      <HeroSection
        ready={ready}
        showVideo={false}
        showCta
        ctaLabel="Start the Form"
        ctaOnClick={() =>
          formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        bgImage="images/hero1.jpg"
        titleLine1={
          <>
            Expression <span className="rg-gold">of</span>
          </>
        }
        titleLine2={
          <>
            Interest <span className="rg-amber">Form</span>
          </>
        }
        subtitle="A dedicated full-page offer form with the same field set as your reference, reimagined in the Real Gold design language."
      />

      <section className="eoi-shell">
        <div className="eoi-shell__rule" />
        <div className="eoi-wrap" ref={formTopRef}>
          <div className="eoi-main">
            <div className="eoi-heading" data-gsap="fade-up">
              <span className="eoi-heading__eyebrow">Same fields, refined presentation</span>
              <h2 className="eoi-heading__title" data-gsap="char-reveal" data-gsap-start="top 88%">
                Submit your offer with
                <br />
                <em>clarity and confidence.</em>
              </h2>
              <p className="eoi-heading__body" data-gsap="fade-up" data-gsap-delay="0.14">
                The field set below mirrors the reference Expression of Interest
                form, while the layout, spacing, and styling now sit comfortably
                inside the Real Gold Properties brand.
              </p>
              <p className="eoi-heading__body" data-gsap="fade-up" data-gsap-delay="0.18">
                Each section can be opened or closed smoothly, so the experience
                feels lighter while keeping every field exactly where it should be.
              </p>
            </div>

            <form
              className="eoi-form"
              onSubmit={handleSubmit}
              data-gsap="clip-smooth-down"
              data-gsap-start="top 85%"
              data-gsap-delay="0.18"
            >
              {FORM_SECTIONS.map((section) => {
                const isOpen = openSections.includes(section.number);

                return (
                  <section
                    key={section.number}
                    className={`eoi-form__section${isOpen ? " is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className="eoi-form__toggle"
                      aria-expanded={isOpen}
                      aria-controls={`eoi-panel-${section.number}`}
                      onClick={() => toggleSection(section.number)}
                    >
                      <div className="eoi-form__section-head">
                        <span className="eoi-form__section-no">{section.number}</span>
                        <div>
                          <h3 className="eoi-form__section-title">{section.title}</h3>
                          <p className="eoi-form__section-body">{section.description}</p>
                        </div>
                      </div>
                      <span className="eoi-form__chevron" aria-hidden="true" />
                    </button>

                    <div className="eoi-form__panel" id={`eoi-panel-${section.number}`}>
                      <div className="eoi-form__panel-inner">
                        <div className="eoi-form__grid">
                          {section.fields.map((field) => (
                            <Field key={field.id} field={field} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}

              <div className="eoi-submit">
                <div className="eoi-submit__note">
                  <span className="eoi-submit__pill">Protected submission</span>
                  <p>
                    Required fields are marked with an asterisk. This page is designed
                    and ready; backend delivery can be connected whenever you want.
                  </p>
                </div>

                <button type="submit" className="eoi-submit__button">
                  Submit Expression of Interest
                </button>
              </div>
            </form>

            <div className="eoi-note" data-gsap="fade-up" data-gsap-delay="0.24">
              <span className="eoi-note__eyebrow">Before you submit</span>
              <p className="eoi-note__body">
                If this offer is accepted, the purchaser will be required to
                enter into and execute a contract of sale on these terms.
              </p>
              <p className="eoi-note__body">
                Multiple parties may submit offers for the seller&apos;s
                consideration, and an offer may be withdrawn at any time before
                a contract of sale is signed by both purchaser and seller.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={`eoi-success${success ? " is-visible" : ""}`} role="dialog" aria-modal="true">
        <div className="eoi-success__card">
          <span className="eoi-success__mark">✦</span>
          <h2>
            Submission <em>received.</em>
          </h2>
          <div className="eoi-success__rule" />
          <p>
            Your Expression of Interest has been captured in this demo flow.
            The page design is complete and can be wired to a live endpoint next.
          </p>
          <button
            type="button"
            className="eoi-success__button"
            onClick={() => setSuccess(false)}
          >
            Return to form
          </button>
        </div>
      </div>
    </main>
  );
}
