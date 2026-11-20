import { hospitalBedImage, patientLiftImage, vitalImages } from "./images";
import { siteContact } from "./site-contact";

export type RentalFaq = { question: string; answer: string };

export type RentalPriceTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
  notes?: string[];
};

export type RentalSpecTable = {
  headers: string[];
  rows: string[][];
  footnote?: string;
};

export type RentalSeoSection =
  | { type: "paragraph"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "priceTable"; table: RentalPriceTable }
  | { type: "specTable"; table: RentalSpecTable }
  | { type: "related"; text: string; links: { label: string; href: string }[] };

export interface RentalSeoPage {
  slug: string;
  pageName: string;
  h1: string;
  titleTag: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  imageAlts: string[];
  intro: string;
  sections: RentalSeoSection[];
  faqs: RentalFaq[];
  requestHeading: string;
  requestCopy: string;
  replyNote: string;
  hours: string;
  addressLine: string;
}

const PHONE = siteContact.phone;
const ADDRESS = "31 Lake Louise Dr, Brampton, ON L6X 4Y6";
const HOURS = "9:00 am – 7:00 pm";

/** Brampton SEO rental pages — content from Medway Mobility SEO document. */
export const rentalSeoPages: RentalSeoPage[] = [
  {
    slug: "hospital-bed-rental",
    pageName: "Hospital Bed Rental",
    h1: "Hospital Bed Rental in Brampton",
    titleTag: "Hospital Bed Rental Brampton | From $140/mo | Medway",
    metaDescription:
      "Rent a hospital bed in Brampton from $140/month, with delivery, setup and pickup included. Call Medway Mobility to check availability.",
    keywords: [
      "hospital bed rental",
      "hospital bed rental Brampton",
      "rent a hospital bed",
      "hospital bed rental near me",
      "medical bed rental",
      "electric hospital bed rental",
      "home hospital bed rental",
      "hospital bed rental cost Ontario",
      "does OHIP pay for a hospital bed",
    ],
    image: hospitalBedImage,
    imageAlts: [
      "Full-electric hospital bed with side rails and mattress, available for rent in Brampton",
      "Medway Mobility team member setting up a hospital bed in a Brampton home",
      "Hand pendant controlling head, foot and height positions on a rental hospital bed",
    ],
    intro: `Hospital bed rental in Brampton starts from $140 a month. Medway Mobility delivers, sets up and picks up full-electric hospital beds across Brampton, so your family member can recover or receive care at home without buying a bed. Call ${PHONE} or request a quote and we will confirm availability and a delivery time.`,
    sections: [
      { type: "h2", text: "Hospital bed rental prices in Brampton" },
      {
        type: "paragraph",
        text: "Rental rates depend on the bed and how long you need it. Current monthly rates:",
      },
      {
        type: "priceTable",
        table: {
          headers: ["Package", "What is included", "Price per month"],
          rows: [
            ["Basic full-electric bed", "Bed frame, mattress, side rails, hand pendant", "From $140.00"],
            ["Premium or low bed", "Lower height, pressure-relief mattress", "From $250.00"],
            ["Air mattress", "Alternate air mattress to help prevent bedsores", "From $200.00"],
          ],
          notes: [
            "Delivery, setup and pickup in Brampton: $100.00",
            "Minimum rental: 15 days. Longer rentals: for three months $120.00/month",
            "Add-ons such as an over-bed table or extra rails: $25.00",
            "Deposit: none",
          ],
        },
      },
      {
        type: "paragraph",
        text: `Not sure which package you need? Call ${PHONE} and we will recommend one. There is no charge for the advice.`,
      },
      { type: "h2", text: "Every Medway rental includes" },
      {
        type: "list",
        items: [
          "A hospital bed with adjustable head, foot and height positions",
          "A mattress and a clean mattress cover",
          "Side rails — half or full",
          "A hand pendant for the person in bed and for caregivers",
          "Delivery, assembly and a walk-through of the controls",
          "Pickup when you no longer need the bed",
          `A phone number to call if anything stops working: ${PHONE}`,
        ],
      },
      { type: "h2", text: "Who rents a hospital bed" },
      {
        type: "list",
        items: [
          "Patients coming home from the hospital or after surgery, including families working with a discharge planner",
          "Families caring for a parent or spouse at home with a long-term condition",
          "Palliative and end-of-life care at home",
          "People waiting for a bed they have bought or that is funded to arrive",
          "Caregivers whose backs are suffering from lifting and repositioning at a regular bed height",
        ],
      },
      { type: "h2", text: "Choosing the right hospital bed" },
      { type: "h3", text: "Manual, semi-electric or full-electric?" },
      {
        type: "paragraph",
        text: "Manual beds use hand cranks, which can work if a caregiver adjusts the bed only occasionally. Semi-electric beds raise the head and foot with a button but crank the height. Full-electric beds adjust head, foot and height with a hand pendant, which is easier on caregivers and lets the person in bed change position on their own.",
      },
      { type: "h3", text: "Mattress and rails" },
      {
        type: "paragraph",
        text: "A standard foam mattress suits most short-term rentals. If the person is in bed most of the day, ask about a pressure-relief mattress. Rails can help with repositioning and getting in and out of bed, but they are not right for everyone, so ask a nurse or occupational therapist if you are unsure.",
      },
      { type: "h3", text: "Size and weight limit" },
      {
        type: "specTable",
        table: {
          headers: ["Specification", "Standard bed"],
          rows: [
            ["Weight capacity", "400 lb"],
            ["Mattress size", "36 x 80 in"],
            ["Overall size", "40 x 84 in"],
            ["Height range", "20 to 40 in"],
            ["Power", "Standard household outlet"],
          ],
          footnote:
            "If the person weighs more than the limit, call us before you order. Specs match our standard rental bed.",
        },
      },
      { type: "h2", text: "Delivery, setup and pickup in Brampton" },
      {
        type: "paragraph",
        text: "We bring the bed to your home, assemble it where you want it and show you and your family how the controls and rails work before we leave. Most Brampton deliveries are within 5 hours; call for after 7 pm availability. When you are done, call us and we pick up the bed, so there is nothing to take apart or haul away.",
      },
      { type: "h3", text: "How to prepare for delivery" },
      {
        type: "list",
        items: [
          "Tell us about the entrance, stairs and the route from the door to the room, so we bring the right equipment",
          "Make sure there is a power outlet within reach of the bed",
          "Have the person who will use the bed, or the main caregiver, home for the walk-through",
        ],
      },
      { type: "h2", text: "Areas we serve in Brampton" },
      {
        type: "paragraph",
        text: "We deliver across Brampton, including Downtown Brampton, Bramalea, Heart Lake, Springdale, Castlemore, Snelgrove, Mount Pleasant, Credit Valley and Brampton East. If you are just outside Brampton, call us to check.",
      },
      { type: "h2", text: "How renting a hospital bed works" },
      {
        type: "list",
        items: [
          `Call ${PHONE} or send the short form below with who the bed is for, when you need it and roughly how long.`,
          "We confirm availability, the monthly price and the rental terms.",
          "We deliver and set up the bed at a time that works for you.",
          "Use it for as long as you need. Call us to extend.",
          "When you are finished, we book a pickup and collect the bed.",
        ],
      },
      { type: "h2", text: "Rental terms in plain language" },
      {
        type: "list",
        items: [
          "Minimum rental period: 15 days",
          "Billing: monthly. Billing stops when the bed has been picked up",
          "Extending: call us before the rental ends",
          "Damage or loss: 50% of the equipment price",
          "Payment methods: Interac e-Transfer",
        ],
      },
      { type: "h2", text: "Will insurance or a funding program pay for a hospital bed rental?" },
      { type: "paragraph", text: "It depends on your situation." },
      {
        type: "list",
        items: [
          "OHIP: OHIP generally does not pay for a privately rented hospital bed.",
          "Private health insurance: some plans cover part of a rental, often with a doctor's note. Check with your insurer before you rent. We can provide an invoice for your claim.",
          "Government and veterans programs: ODSP, Veterans Affairs Canada and WSIB can cover equipment for eligible people. Ask your caseworker or provider.",
          "Home care: if you are receiving home care in Ontario, ask your care coordinator whether they can arrange equipment for you.",
        ],
      },
      {
        type: "paragraph",
        text: `Not sure where to start? Call ${PHONE} and we will tell you what we know and what paperwork we can provide.`,
      },
      { type: "h2", text: "Cleaning, inspection and safety" },
      {
        type: "paragraph",
        text: "Every bed is disinfected and inspected before it goes out. Check the rails, controls and power cord when the bed is set up, and stop using the bed and call us if anything looks damaged. A nurse, doctor or occupational therapist can advise on safe use for the person in bed.",
      },
      {
        type: "related",
        text: "Many families rent more than one item at a time. See our patient lift rentals for safer transfers from bed to chair, our mobility scooter rentals, or all medical equipment rentals in Brampton.",
        links: [
          { label: "patient lift rentals", href: "/rentals/patient-lift-rental" },
          { label: "mobility scooter rentals", href: "/rentals/mobility-scooter-rental" },
          { label: "all medical equipment rentals", href: "/rentals" },
        ],
      },
    ],
    faqs: [
      {
        question: "How much does it cost to rent a hospital bed in Brampton?",
        answer:
          "Hospital bed rental in Brampton starts from $140.00 a month for a full-electric bed, and rates go up for premium and bariatric beds. See the price table above for what is included.",
      },
      {
        question: "How much does it cost to rent a hospital bed in Ontario?",
        answer:
          "Most Ontario providers charge a monthly rate, and prices vary with the bed type and whether delivery is included. Our Brampton rates are listed above, so you can compare like for like: ask any provider what is included, such as the mattress, rails, delivery, setup and pickup.",
      },
      {
        question: "Can you rent a hospital-style bed?",
        answer:
          "Yes. We rent full-electric hospital beds for home use in Brampton, with a mattress and rails, delivered and set up.",
      },
      {
        question: "Does OHIP pay for a hospital bed for home?",
        answer:
          "OHIP generally does not pay for a privately rented hospital bed. Some private insurance and funding programs may cover part of the cost. See the funding section above, and call us if you need an invoice or paperwork.",
      },
      {
        question: "What is the average cost of a hospital bed?",
        answer:
          "Buying a hospital bed costs several thousand dollars, depending on the model. Renting is usually more practical when you need a bed for weeks or months.",
      },
      {
        question: "How quickly can you deliver a hospital bed in Brampton?",
        answer: `1–5 hours. Call ${PHONE} with your address and we will confirm the earliest delivery time.`,
      },
      {
        question: "How long can I rent a hospital bed for?",
        answer:
          "The minimum rental is 15 days, with no set maximum. Call us to extend before your rental ends.",
      },
      {
        question: "Do I need a prescription or a doctor's note?",
        answer:
          "A doctor, nurse or occupational therapist can help you choose the right bed, and some insurers ask for a note before they reimburse you.",
      },
      {
        question: "What is the weight limit of the bed?",
        answer: "Our standard bed holds up to 400 lb.",
      },
      {
        question: "What happens if the bed stops working?",
        answer: `Stop using it and call ${PHONE}.`,
      },
      {
        question: "What happens when I no longer need the bed?",
        answer:
          "Call us to book a pickup. We collect the bed from your home and end the rental, so there is nothing to take apart.",
      },
    ],
    requestHeading: "Request a hospital bed rental in Brampton",
    requestCopy: `Call ${PHONE} or send the form below. Tell us who the bed is for, when you need it and for how long, and we will reply within 1 hour.`,
    replyNote: "Form fields: name, phone, what you need, when you need it. Do not ask for health details.",
    hours: HOURS,
    addressLine: ADDRESS,
  },
  {
    slug: "mobility-scooter-rental",
    pageName: "Mobility Scooter Rental",
    h1: "Mobility Scooter Rental in Brampton",
    titleTag: "Mobility Scooter Rental Brampton | From $75 | Medway",
    metaDescription:
      "Rent a mobility scooter in Brampton by the day, week or month from $75. Delivery, setup and pickup available. Call Medway Mobility.",
    keywords: [
      "mobility scooter rental",
      "mobility scooter rental near me",
      "rent a mobility scooter",
      "rent mobility scooter",
      "mobility scooter rental Brampton",
      "weekly mobility scooter rental",
      "foldable travel mobility scooter rental",
      "do you need a licence for a mobility scooter in Ontario",
      "how much is it to rent a mobility scooter",
    ],
    image: vitalImages.categories["mobility-scooters"],
    imageAlts: [
      "Foldable travel mobility scooter available to rent in Brampton",
      "Four-wheel mobility scooter with basket and charger, delivered by Medway Mobility",
      "Travel mobility scooter folded into a car trunk",
    ],
    intro: `Mobility scooter rental in Brampton starts from $75. Medway Mobility rents travel and full-size scooters by the day, week or month, delivers and sets them up in Brampton, and picks them up when you are done. Call ${PHONE} or request a quote and we will confirm which scooter is available and when we can bring it.`,
    sections: [
      { type: "h2", text: "Mobility scooter rental prices in Brampton" },
      {
        type: "paragraph",
        text: "Rental rates depend on the scooter and how long you need it. Current rates:",
      },
      {
        type: "priceTable",
        table: {
          headers: ["Rental period", "Standard scooter", "Travel (foldable) scooter"],
          rows: [
            ["1 day", "$75.00", "Call for quote"],
            ["1 week", "$100.00", "Call for quote"],
            ["2 weeks", "$150.00", "Call for quote"],
            ["4 weeks or 1 month", "$200.00", "Call for quote"],
          ],
          notes: [
            "Refundable security deposit: $200, returned within 1 business day after the scooter is back, less any damage",
            "Delivery, setup and pickup in Brampton: $90.00",
            "Payment: Interac e-Transfer",
          ],
        },
      },
      {
        type: "paragraph",
        text: `Not sure which scooter or rental length you need? Call ${PHONE} and we will recommend one. There is no charge for the advice.`,
      },
      { type: "h2", text: "Every Medway scooter rental includes" },
      {
        type: "list",
        items: [
          "The scooter, with a matching charger",
          "A basket and any accessories listed on your quote",
          "A short tutorial on the controls, charging and safe riding when we deliver it",
          "A scooter that has been cleaned and sanitized before it goes out",
          "Pickup when the rental ends",
          `A phone number to call if it stops working or the battery will not charge: ${PHONE}`,
        ],
      },
      { type: "h2", text: "Who rents a mobility scooter" },
      {
        type: "list",
        items: [
          "People recovering from surgery, an injury, or a foot, knee or hip problem",
          "Seniors who want to try a scooter before deciding to buy one",
          "Visitors and families who need extra mobility for an event, a trip or a holiday",
          "Anyone who tires on longer outings such as shopping, appointments or community events",
          "People whose own scooter is being repaired",
        ],
      },
      { type: "h2", text: "Choosing the right mobility scooter" },
      { type: "h3", text: "Travel (foldable) or standard scooter?" },
      {
        type: "paragraph",
        text: "Travel scooters come apart or fold into a few light pieces, so they fit in most car trunks and are easier to take on trips. They usually have a shorter range and a lower weight limit. Standard scooters are heavier and more stable, with a longer range and a higher weight limit, and are better for everyday use in and around your home.",
      },
      { type: "h3", text: "Three wheels or four?" },
      {
        type: "paragraph",
        text: "Three-wheel scooters have a tighter turning circle, which helps indoors and in narrow spaces. Four-wheel scooters are more stable on uneven ground and outdoors.",
      },
      { type: "h3", text: "Weight limit, range and size" },
      {
        type: "specTable",
        table: {
          headers: ["Specification", "Travel scooter", "Standard 3-wheel", "Standard 4-wheel"],
          rows: [
            ["Weight capacity", "350 lb", "400 lb", "400 lb"],
            ["Range per charge", "10–15 km", "10–15 km", "10–15 km"],
            ["Top speed", "7 km/h", "8 km/h", "8 km/h"],
            ["Fits in a car trunk", "Yes", "No", "No"],
          ],
          footnote:
            "If the rider weighs more than the limit, call us before you order. Specs match our rental fleet.",
        },
      },
      { type: "h2", text: "Do you need a licence or insurance to ride a mobility scooter in Ontario?" },
      {
        type: "paragraph",
        text: "In Ontario, a mobility scooter used as a mobility aid is generally not treated as a motor vehicle, so you do not need a driver licence, licence plate or vehicle insurance to ride one. You still need to follow local rules for sidewalks, pathways and crossings, ride at a walking pace around pedestrians, and be careful on roads.",
      },
      { type: "h2", text: "Delivery, setup and pickup in Brampton" },
      {
        type: "paragraph",
        text: "We bring the scooter to your home or another Brampton address, set it up, show you how to charge it and use the controls, and answer your questions before we leave. Same-day delivery is often available; call for the next opening. When your rental ends, we pick up the scooter and the charger.",
      },
      { type: "h2", text: "Areas we serve in Brampton" },
      {
        type: "paragraph",
        text: "We deliver across Brampton, including Downtown Brampton, Bramalea, Heart Lake, Springdale, Castlemore, Snelgrove, Mount Pleasant, Credit Valley and Brampton East. If you are just outside Brampton, call us to check.",
      },
      { type: "h2", text: "Using your rental scooter" },
      {
        type: "list",
        items: [
          "Charge the battery fully before each outing, and plan trips well within the scooter's range",
          "Slow down on ramps, curbs and uneven ground, and use ramps made for scooters",
          "Ask us before using the scooter in heavy rain or snow",
          "Check your transit agency's rules before travelling with a scooter. Brampton Transit and GO Transit set size and weight limits",
          "Heading to the airport or on a trip? Ask us about a travel scooter and how to transport it.",
        ],
      },
      {
        type: "paragraph",
        text: "A doctor, nurse or occupational therapist can advise whether a scooter is the right choice for you.",
      },
      { type: "h2", text: "How renting a mobility scooter works" },
      {
        type: "list",
        items: [
          `Call ${PHONE} or send the short form below with when you need the scooter, how long for, and whether it needs to fit in a car.`,
          "We confirm availability, the rental price and the terms.",
          "We deliver and set up the scooter, and show you how to use it.",
          "Ride for as long as you need. Call us to extend.",
          "When you are finished, we book a pickup and collect the scooter and charger.",
        ],
      },
      { type: "h2", text: "Rental terms in plain language" },
      {
        type: "list",
        items: [
          "Minimum rental period: 1 day",
          "Deposit: $200.00 refunded within 1 business day after return, less any deductions",
          "Billing: monthly. Billing stops when the scooter has been picked up",
          "Extending: call us before the rental ends",
          "Cancelling: anytime with no fee",
          "Damage or loss: 75% of the equipment",
          "Late return: charge per day",
        ],
      },
      { type: "h2", text: "Cleaning, inspection and safety" },
      {
        type: "paragraph",
        text: "Every scooter is sanitized and checked before it goes out: brakes, controls, tires and battery. If anything feels wrong when you ride, stop and call us.",
      },
      {
        type: "related",
        text: "Many families rent more than one item. See our hospital bed rentals for care at home, our patient lift rentals for safer transfers, or all medical equipment rentals in Brampton.",
        links: [
          { label: "hospital bed rentals", href: "/rentals/hospital-bed-rental" },
          { label: "patient lift rentals", href: "/rentals/patient-lift-rental" },
          { label: "all medical equipment rentals", href: "/rentals" },
        ],
      },
    ],
    faqs: [
      {
        question: "How much does it cost to rent a mobility scooter in Brampton?",
        answer:
          "Mobility scooter rental in Brampton starts from $75.00 depending on the scooter and how long you need it. See the price table above for the daily, weekly and monthly rates, the deposit and the delivery fee.",
      },
      {
        question: "Where can I rent a mobility scooter in Brampton or Mississauga?",
        answer: `Medway Mobility rents mobility scooters in Brampton and Mississauga and delivers them to your home. Call ${PHONE} with your address and we will confirm.`,
      },
      {
        question: "Who has the cheapest mobility scooters?",
        answer:
          "The lowest headline price is not always the lowest total cost. Compare the rental length, the deposit, delivery and pickup fees, taxes, and whether a tutorial and a charger are included. We list all of these above so you can compare like for like.",
      },
      {
        question: "Do I need a licence to ride a rented mobility scooter?",
        answer:
          "In Ontario you generally do not need a driver licence, plate or insurance for a mobility scooter used as a mobility aid. See the licence section above.",
      },
      {
        question: "Can I rent a scooter for just one day?",
        answer: `Yes, daily rentals are available for events and short trips. Call us to book. ${PHONE}`,
      },
      {
        question: "How far can a rental scooter go on one charge?",
        answer:
          "Range depends on the model, the rider's weight and the terrain. Our scooters travel about 10–15 km on a full charge. We show you how to charge it when we deliver.",
      },
      {
        question: "Can I use the scooter indoors and outdoors?",
        answer:
          "Yes. Three-wheel scooters turn tighter indoors, and four-wheel scooters are steadier outdoors.",
      },
      {
        question: "What happens if the scooter breaks down or the battery dies?",
        answer: `Call ${PHONE}. We will help you with next steps and a replacement when needed.`,
      },
      {
        question: "What happens when I no longer need the scooter?",
        answer:
          "Call us to book a pickup. We collect the scooter and the charger and return your deposit as described in the rental terms.",
      },
    ],
    requestHeading: "Request a mobility scooter rental in Brampton",
    requestCopy: `Call ${PHONE} or send the form below. Tell us when you need the scooter, how long for, and whether it needs to fit in a car, and we will reply within one business day.`,
    replyNote: "Form fields: name, phone, what you need, when you need it. Do not ask for health details.",
    hours: HOURS,
    addressLine: ADDRESS,
  },
  {
    slug: "patient-lift-rental",
    pageName: "Patient Lift Rental",
    h1: "Patient Lift Rental in Brampton",
    titleTag: "Hoyer Patient Lift Rental Brampton | From $250 / month | Medway",
    metaDescription:
      "Rent a Hoyer patient lift in Brampton from $250 a month. Delivery, setup and pickup available, with slings sized for you. Call Medway Mobility.",
    keywords: [
      "patient lift rental",
      "Hoyer lift rental",
      "rent patient lift",
      "Hoyer lift rental near me",
      "patient lift rental near me",
      "Hoyer lift rental Toronto",
      "Hoyer lift sling",
      "patient lift for home",
      "what does it cost to rent a Hoyer lift",
      "does OHIP or ADP pay for a patient lift",
    ],
    image: patientLiftImage,
    imageAlts: [
      "Battery-powered Hoyer patient lift with six-point cradle, available to rent in Brampton",
      "Caregiver using a rental patient lift and sling to move a person from bed to chair",
      "Medway Mobility team member showing a family how to use a rental patient lift at home in Brampton",
    ],
    intro: `Patient lift rental in Brampton starts from $150 a week. Medway Mobility delivers, sets up and picks up battery-powered Hoyer patient lifts across Brampton, and shows you how to use the lift and choose the right sling before we leave. Call ${PHONE} or request a quote and we will confirm availability and a delivery time.`,
    sections: [
      { type: "h2", text: "Patient lift rental prices in Brampton" },
      {
        type: "paragraph",
        text: "Rental rates depend on how long you need the lift and whether you need a sling. Current rates:",
      },
      {
        type: "priceTable",
        table: {
          headers: ["Rental period", "Battery-powered lift", "Lift with rental sling"],
          rows: [
            ["1 week", "$150.00", "Included"],
            ["2 weeks", "$175.00", "Included"],
            ["3 weeks", "$200.00", "Included"],
            ["4 weeks or 1 month", "$250.00", "Included"],
          ],
          notes: [
            "Sling: included. Slings come in sizes from small to extra large, so we confirm the size before we deliver",
            "Delivery, setup and pickup in Brampton: $75.00",
            "Taxes: extra",
            "Refundable deposit: $100.00",
          ],
        },
      },
      {
        type: "paragraph",
        text: `Not sure which lift or sling you need? Call ${PHONE} and we will recommend one. There is no charge for the advice.`,
      },
      { type: "h2", text: "Every Medway patient lift rental includes" },
      {
        type: "list",
        items: [
          "A battery-powered floor lift with a charger",
          "Delivery to the room where you will use it, and setup",
          "A walk-through of the controls, charging and safety checks for you and your caregivers",
          "Help choosing and sizing a sling",
          "A lift that has been cleaned and inspected before it goes out",
          "Pickup when you no longer need the lift",
          `A phone number to call if anything stops working: ${PHONE}`,
        ],
      },
      { type: "h2", text: "Who rents a patient lift" },
      {
        type: "list",
        items: [
          "Families bringing someone home from the hospital or a rehab facility",
          "Caregivers who are hurting their backs from lifting a parent or spouse",
          "People recovering from a stroke, surgery or a fall who cannot bear their own weight for now",
          "Families in palliative or end-of-life care at home",
          "People waiting for a lift they have bought or that is funded to arrive",
        ],
      },
      { type: "h2", text: "Choosing the right patient lift" },
      { type: "h3", text: "Hoyer lift, sit-to-stand lift or ceiling lift?" },
      {
        type: "paragraph",
        text: '"Hoyer lift" is the name most people use for a floor lift, which lifts a person in a sling and moves on wheels from a bed to a chair, commode or bath. A sit-to-stand lift suits someone who can bear some weight through their legs and needs help standing up. A ceiling lift runs on a track fixed to the ceiling and is installed, not rented. Medway rents battery-powered floor lifts, which suit most home transfers.',
      },
      {
        type: "paragraph",
        text: "A nurse, doctor or occupational therapist can tell you which type is safe for the person you care for.",
      },
      { type: "h3", text: "Slings: which one and what size?" },
      {
        type: "paragraph",
        text: "The sling is the part that holds the person, so it has to match the lift, the person's size and weight, and the kind of transfer. Full-body slings give the most support, universal slings suit many people, and some slings are made for toileting or bathing. Never attach a sling that is not made for the lift, and check the stitching, loops and fabric every time you use it. We help you choose and size the sling when you call, and we can rent one with the lift.",
      },
      { type: "h3", text: "Weight limit, size and clearance" },
      {
        type: "specTable",
        table: {
          headers: ["Specification", "Battery-powered floor lift"],
          rows: [
            ["Weight capacity", "400 lb"],
            ["Lift type", "Floor lift with six-point cradle, used with a full-body sling"],
            ["Lift weight", "65 lb"],
            [
              "Power",
              "Rechargeable battery, charged from a standard outlet. Manual lowering if the battery runs out.",
            ],
          ],
          footnote:
            "If the person weighs more than the limit, call us before you order. Specs match our rental lift.",
        },
      },
      { type: "h3", text: "Will it fit under the bed and roll on carpet?" },
      {
        type: "paragraph",
        text: "A floor lift needs space under the bed for its legs, and a solid platform bed can block them. Measure the gap under the bed frame and tell us when you call. The lift rolls more easily on hard floors than on thick carpet, and it is harder to push with a person in the sling.",
      },
      { type: "h3", text: "Can one caregiver use the lift alone?" },
      {
        type: "paragraph",
        text: "It depends on the person, the transfer and the lift maker's instructions. Some transfers need two people. We show you the controls at delivery, and an occupational therapist or nurse can confirm how many people you need. We do not give clinical advice, so ask your care team.",
      },
      { type: "h2", text: "Delivery, setup and training in Brampton" },
      {
        type: "paragraph",
        text: "We bring the lift to your home, set it up in the room where you will use it, and show you how to charge it, operate it and lower it safely. Same-day delivery is available when the lift is in stock; call for the next opening. We ask that the main caregiver is home for the walk-through. When you are done, call us and we pick up the lift.",
      },
      { type: "h3", text: "How to prepare for delivery" },
      {
        type: "list",
        items: [
          "Measure the gap under the bed and the width of the doorways the lift has to pass through",
          "Clear a path from the door to the room, and space around the bed or chair",
          "Make sure there is a power outlet within reach for charging",
          "Have the main caregiver home, and the sling size ready if you already have one",
        ],
      },
      { type: "h2", text: "Areas we serve in Brampton" },
      {
        type: "paragraph",
        text: "We deliver across Brampton, including Downtown Brampton, Bramalea, Heart Lake, Springdale, Castlemore, Snelgrove, Mount Pleasant, Credit Valley and Brampton East, and Mississauga. If you are just outside Brampton, call us to check.",
      },
      { type: "h2", text: "How renting a patient lift works" },
      {
        type: "list",
        items: [
          `Call ${PHONE} or send the short form below with who the lift is for, their weight, and when you need it.`,
          "We confirm availability, the price, the sling size and the terms.",
          "We deliver and set up the lift, and show you how to use it.",
          "Use it for as long as you need. Call us to extend.",
          "When you are finished, we book a pickup and collect the lift.",
        ],
      },
      { type: "h2", text: "Rental terms in plain language" },
      {
        type: "list",
        items: [
          "Minimum rental period: one week",
          "Billing: weekly / monthly. Billing stops when the lift has been picked up",
          "Extending: call us before the rental ends",
          "Damage or loss: 75% of the equipment",
          "Payment methods: Interac e-Transfer",
        ],
      },
      { type: "h2", text: "Safety, cleaning and inspection" },
      {
        type: "paragraph",
        text: "Every lift is sanitized and checked before it goes out: the battery, the boom, the base and the controls. Inspect the lift and the sling every time before you use them, and never leave a person hanging in the sling alone. If anything looks damaged or does not work properly, stop using it and call us. A nurse, doctor or occupational therapist can advise on safe transfers for the person you care for.",
      },
      {
        type: "related",
        text: "Many families rent more than one item. See our hospital bed rentals for care at home, our mobility scooter rentals, or all medical equipment rentals in Brampton.",
        links: [
          { label: "hospital bed rentals", href: "/rentals/hospital-bed-rental" },
          { label: "mobility scooter rentals", href: "/rentals/mobility-scooter-rental" },
          { label: "all medical equipment rentals", href: "/rentals" },
        ],
      },
    ],
    faqs: [
      {
        question: "How much does it cost to rent a patient lift in Brampton?",
        answer:
          "Patient lift rental in Brampton starts from $150 for one week, and the price per week falls for longer rentals. See the price table above for the weekly and monthly rates, the sling, the delivery fee and the deposit.",
      },
    ],
    requestHeading: "Request a patient lift rental in Brampton",
    requestCopy: `Call ${PHONE} or send the form below. Tell us who the lift is for, when you need it and for how long, and we will confirm availability.`,
    replyNote: "Form fields: name, phone, what you need, when you need it. Do not ask for health details.",
    hours: HOURS,
    addressLine: ADDRESS,
  },
];

export function getRentalSeoPage(slug: string): RentalSeoPage | undefined {
  return rentalSeoPages.find((page) => page.slug === slug);
}
