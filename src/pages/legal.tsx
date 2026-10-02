import type { ReactNode } from 'react';

export interface LegalDoc {
  path: string;
  title: string;
  label: string;
  intro: string;
  sections: { heading: string; body: ReactNode }[];
}

const EMAIL = 'rajkumarayilvar@gmail.com';
const PHONE = '+91 6281589014';
const ADDRESS = 'Isnapur X Road, Patancheruvu 502307, Telangana, India';

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-6 space-y-2">
    {items.map((i) => <li key={i}>{i}</li>)}
  </ul>
);

const contact = (
  <p>
    Digital Presence Agency, {ADDRESS}. Email:{' '}
    <a className="text-accent-cyan underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>. Phone: {PHONE}.
  </p>
);

export const legalDocs: LegalDoc[] = [
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    label: 'Privacy Policy',
    intro: 'How Digital Presence Agency collects, uses and protects the information you share with us.',
    sections: [
      {
        heading: 'Information we collect',
        body: <List items={[
          'Contact details you provide: name, email address, phone number and the message you send us through the contact form, email or WhatsApp.',
          'Project information: requirements, brand assets and files you share so we can deliver the agreed work.',
          'Basic technical data such as browser type and pages visited, used to keep the website working well.',
        ]} />,
      },
      {
        heading: 'How we use it',
        body: <List items={[
          'To reply to your enquiries and prepare proposals, agreements and timelines.',
          'To deliver and support the work we have agreed with you.',
          'To issue invoices and keep records of payments received.',
          'To improve our website and services.',
        ]} />,
      },
      {
        heading: 'Payments',
        body: <p>We do not store your bank, UPI or net banking credentials. Payments are made through Indian payment methods (UPI and net banking), which are processed by your bank or payment app. See our Payment Mode page for details.</p>,
      },
      {
        heading: 'Sharing',
        body: <p>We do not sell your personal information. We share it only with service providers needed to deliver your project (for example hosting providers), when you ask us to, or when required by Indian law.</p>,
      },
      {
        heading: 'Your rights and retention',
        body: <p>You may ask us to access, correct or delete the personal information we hold about you, consistent with applicable Indian law including the Digital Personal Data Protection Act, 2023. We keep project and billing records for as long as needed to deliver our services and meet legal and accounting obligations.</p>,
      },
      { heading: 'Contact us', body: contact },
    ],
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms & Conditions',
    label: 'Terms & Conditions',
    intro: 'The terms under which Digital Presence Agency carries out work for its clients.',
    sections: [
      {
        heading: 'Agreement before work begins',
        body: <p>We begin work only after both parties have agreed to a written project agreement that sets out the scope, the requirements, the deliverables and the delivery timeline. Nothing is started on the basis of a verbal discussion alone.</p>,
      },
      {
        heading: 'Scope and requirements',
        body: <p>The requirements recorded in the agreement are the standard against which the finished work is judged. Changes to scope or timeline after sign-off must be agreed in writing and may change the delivery date or the fee.</p>,
      },
      {
        heading: 'Timeline',
        body: <p>We commit to the delivery timeline in the agreement. Timelines depend on you providing content, feedback and approvals on time; delays on the client side move the delivery date by the same amount.</p>,
      },
      {
        heading: 'Payment',
        body: <p>We take payment once the work is completely done. Fees are in Indian Rupees (INR) and are payable by UPI or net banking only. Details are on the Payment Mode page.</p>,
      },
      {
        heading: 'Refunds',
        body: <p>Refunds apply only when the delivered work does not meet the requirements declared in the agreement. Details are on the Refund Policy page.</p>,
      },
      {
        heading: 'Ownership',
        body: <p>On full payment, you own the final deliverables created specifically for you. We may keep our general tools, code libraries and know-how, and may show completed work in our portfolio unless you ask us in writing not to.</p>,
      },
      {
        heading: 'Your responsibilities',
        body: <p>You confirm that the content, brand assets and materials you provide are yours to use and do not infringe anyone else&apos;s rights.</p>,
      },
      {
        heading: 'Liability and governing law',
        body: <p>Our liability is limited to the fee for the work in question. These terms are governed by the laws of India, and disputes fall under the courts having jurisdiction in Telangana.</p>,
      },
      { heading: 'Contact us', body: contact },
    ],
  },
  {
    path: '/payment-mode',
    title: 'Payment Mode',
    label: 'Payment Mode',
    intro: 'How and when you pay Digital Presence Agency.',
    sections: [
      {
        heading: 'Accepted payment modes',
        body: <List items={[
          'UPI (any UPI app).',
          'Net banking (bank transfer through your bank).',
        ]} />,
      },
      {
        heading: 'Indian payments only',
        body: <p>We accept payments in Indian Rupees (INR) through Indian payment modes only. International payments, cards and other wallet methods are not accepted.</p>,
      },
      {
        heading: 'When you pay',
        body: <List items={[
          'No payment is taken before the work starts.',
          'We start only after you have agreed to the project agreement, including the requirements and the delivery timeline.',
          'Payment is requested once the work is completely done and delivered as per the agreement.',
        ]} />,
      },
      {
        heading: 'Invoices and confirmation',
        body: <p>We share an invoice when the work is completed. Once your UPI or net banking payment is received, we confirm it in writing and hand over the final deliverables.</p>,
      },
      { heading: 'Contact us', body: contact },
    ],
  },
  {
    path: '/refund-policy',
    title: 'Refund Policy',
    label: 'Refund Policy',
    intro: 'When a refund applies, and how to ask for one.',
    sections: [
      {
        heading: 'When a refund applies',
        body: <p>A refund is available only when the completed work does not meet the requirements declared in the signed project agreement.</p>,
      },
      {
        heading: 'When a refund does not apply',
        body: <List items={[
          'You have changed your mind or your business plans have changed.',
          'You want changes that were not part of the agreed requirements (these are treated as new work).',
          'Delays or problems caused by content, approvals or third-party services outside our control.',
          'Work that matches the requirements in the agreement.',
        ]} />,
      },
      {
        heading: 'How to request a refund',
        body: <p>Write to us at <a className="text-accent-cyan underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a> explaining which requirements from the agreement the delivered work does not meet. We will review the request against the agreement and reply in writing.</p>,
      },
      {
        heading: 'How refunds are paid',
        body: <p>Approved refunds are returned in INR to the same UPI ID or bank account the payment came from.</p>,
      },
      { heading: 'Contact us', body: contact },
    ],
  },
];

export const findLegalDoc = (path: string) =>
  legalDocs.find((d) => d.path === path.replace(/\/+$/, ''));
