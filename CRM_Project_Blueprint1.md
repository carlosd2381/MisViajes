* This project is for a Mexican Travel Agency. All crm side text MUST be in spanish, the only exception will be when it comes to like templates, all that will be Spanish/English. I will be submitting all my chats in english as my writing in spanish is limited, but i can read it 100%.

* Must be built in a modular structure, smallest file sizes as possible.

* Data dictionary and a schema file must be updated with any changes as the project is built.

* Project must be built with a modern and fun styling look. The styling should be consistant throughtout the project

* Would like for the project to be tracked in a file on what needs to be done, what has been completed, etc.



🏢 CORE MODULES & STRUCTURE

1. DASHBOARD & HOME SCREEN
Purpose: At-a-glance operational visibility for agents and management

Widgets/Sections:
- My Day View: Today's tasks, follow-ups, departures, payments due
- Pipeline Snapshot: Active leads by stage (New → Quoting → Negotiating → Booked → Traveling → Post-Trip)
- Team Activity Feed: Recent bookings, client communications, task completions
- Urgent Alerts: Passport expirations, balance due, visa deadlines, flight changes
- Performance Metrics: My bookings this month vs. target, conversion rate
- Birthdays/Anniversaries: Clients with special dates today (for personal touches)

Mexico-Specific: Weather widget for popular destinations (Cancún, CDMX, Oaxaca, Puerto Vallarta), Peso/Dollar exchange rate tracker



2. CONTACT MANAGEMENT (CRM Core)

A. Client Profiles
- Basic Info: Name, email, phone, address, preferred contact method (WhatsApp vs Email)
- Travel Preferences: 
  - Preferred destinations (beach, colonial cities, eco-tourism, gastronomic)
  - Accommodation style (luxury, boutique, all-inclusive, Airbnb)
  - Budget range per trip (MXN $20k-50k, $50k-100k, $100k+)
  - Travel style (solo, couple, family, group, corporate)
  - Dietary restrictions, mobility needs, special occasions
- Documentation: Passport copies, visa status, vaccination records, emergency contacts
- Payment Info: Preferred payment method, credit card on file (tokenized), billing address
- Communication History: All emails, WhatsApp messages, calls logged automatically

B. Lead Management
- Lead Source Tracking: Facebook/Instagram, Google, Referral, Walk-in, Repeat Client, OTA (Booking.com, Expedia)
- Lead Scoring: Hot/Warm/Cold based on budget clarity, timeline, responsiveness
- Assignment Rules: Round-robin or by specialization (honeymoon specialist, corporate agent, etc.)
- Lead Status: New, Contacted, Qualified, Proposal Sent, Negotiating, Converted, Lost (with reason)

C. Supplier/Partner Contacts
- Airlines (Aeroméxico, Volaris, VivaAerobus, international carriers)
- Hotels & Resorts (direct contacts + OTA relationships)
- DMCs (Destination Management Companies) in key regions
- Transfer companies, tour operators, insurance providers
- Commission rates and payment terms tracked per supplier



3. ITINERARY & BOOKING MANAGEMENT

A. Trip Builder (The Heart of the System)
- Drag-and-Drop Interface: Build multi-day itineraries visually
- Component Library:
  - Flights (with record locator, GDS integration if possible)
  - Hotels (confirmation numbers, check-in/out times, room types)
  - Transfers (private vs shared, pickup instructions)
  - Activities & Tours (time slots, meeting points, inclusions)
  - Car Rentals (pickup/drop-off details, insurance)
  - Travel Insurance (policy numbers, coverage details)
  - Restaurant reservations
- Day-by-Day View: Timeline format with times, confirmations, notes
- Client-Facing Itinerary: Auto-generates beautiful PDF/proposal with agency branding, maps, emergency contacts

B. Booking Status Workflow
1. Inquiry → Initial request received
2. Research → Agent gathering options
3. Quoted → Proposal sent to client
4. Revised → Modifications requested
5. Approved → Client accepted, awaiting deposit
6. Confirmed → Booked with suppliers, deposits paid
7. Finalized → Full payment received, documents sent
8. In Progress → Client traveling
9. Completed → Post-trip follow-up
10. Cancelled (with cancellation reason and fees tracked)

C. Group Bookings
- Group leader management
- Rooming lists
- Split payments across multiple travelers
- Group communication tools



4. SALES & PIPELINE MANAGEMENT

A. Opportunity Tracking
- Deal Value: Total trip value, commission expected, profit margin
- Probability Weighting: % likelihood to close based on stage
- Expected Close Date: For revenue forecasting
- Competitor Tracking: If client is shopping around (price matching notes)

B. Quote Management
- Version Control: Quote v1, v2, v3 with change tracking
- Template Library: Quick quotes for popular packages (Riviera Maya weekend, CDMX cultural tour, etc.)
- Markup Calculator: Automatic commission calculation, tax handling (IVA), supplier net rates
- Expiration Dates: Quotes auto-expire with reminder to client

C. Upsell & Cross-sell Tracking
- Room upgrades offered/accepted
- Travel insurance (yes/no, type)
- Additional tours or experiences
- Airport lounge access, fast track immigration



5. TASK & ACTIVITY MANAGEMENT

A. Automated Workflows (The Time-Saver)
- New Lead: Auto-assign, send welcome email, create follow-up task in 24h
- Quote Sent: Reminder to follow up in 3 days if no response
- Booking Confirmed: Generate invoice, request passport copies, send packing list
- 30 Days Before Departure: Send visa requirements, check passport validity, request final payment
- 7 Days Before: Send final itinerary, emergency contacts, weather forecast
- Day After Return: Send thank you, review request, referral incentive
- 6 Months Post-Trip: "Time to plan your next adventure?" re-engagement

B. Manual Tasks
- Call client about payment
- Check flight schedule changes
- Request special meal on flight
- Arrange surprise for honeymooners
- Follow up on refund status

C. Calendar Integration
- Sync with Google/Outlook calendar
- Block travel dates for agents (if they're escorting groups)
- Supplier meeting scheduling



6. FINANCIAL MANAGEMENT

A. Payment Tracking
- Payment Schedule: Deposit (30%), Installment 2 (30%), Final (40%) - customizable
- Payment Methods: Bank transfer (SPEI), credit card, OXXO pay, cash (with receipt tracking)
- Payment Status: Pending, Partial, Paid, Refunded, Overdue
- Auto-Reminders: Payment due notifications to clients

B. Invoicing (Facturación CFDI)
- Mexican Tax Compliance: CFDI 4.0 invoice generation (critical for Mexican businesses)
- RFC (Tax ID) Management: Client tax IDs for invoicing
- Payment Receipts: Automatic PDF generation
- Credit Notes: For cancellations or modifications

C. Commission Tracking
- Supplier Commissions: Track what's owed to agency (typically 10-15% hotels, 1-5% airlines)
- Agent Commissions: If agents work on commission split (e.g., 50/50 or tiered)
- Commission Reconciliation: Match received commissions against expected

D. Basic Accounting
- Revenue by agent, by destination, by month
- Expense tracking (supplier payments, office expenses)
- Profit & Loss per booking
- Integration with QuickBooks or Contpaqi (popular in Mexico)



7. COMMUNICATION CENTER

A. Integrated Messaging
- Email: Sync with Gmail/Outlook, templates, tracking (opened/clicked)
- WhatsApp Business API: Critical for Mexican market - most clients prefer WhatsApp
- SMS: For urgent updates (flight delays, last-minute changes)
- Internal Notes: @mentions for team collaboration on bookings

B. Template Library
- Welcome new lead
- Quote follow-up
- Payment reminder
- Document request
- Pre-departure briefing
- Post-trip thank you
- Review request
- Referral request

C. Campaign Management (Light Marketing Automation)
- Segmentation: Past cruisers, honeymooners, adventure travelers, corporate clients
- Newsletter: Monthly destination spotlight, deals
- Triggered Emails: Birthday discounts, anniversary of last trip
- WhatsApp Broadcasts: Limited-time offers, flash sales



8. DOCUMENT MANAGEMENT

A. Client Documents
- Passport scans (with expiration alerts 6 months before)
- Visa copies
- Vaccination certificates
- Travel insurance policies
- Signed waivers/liability forms
- Special requests (dietary, accessibility)

B. Booking Documents
- Supplier confirmations (hotels, flights, tours)
- Vouchers for client
- Invoices and receipts
- Change/cancellation documentation

C. Agency Resources
- Supplier contracts and rate sheets
- Marketing materials
- SOPs (Standard Operating Procedures)



9. REPORTING & ANALYTICS

A. Sales Reports
- Bookings by month/quarter/year
- Revenue by agent (leaderboard)
- Conversion rate (leads to bookings)
- Average booking value
- Top destinations booked

B. Financial Reports
- Cash flow (incoming vs outgoing)
- Outstanding receivables (who owes money)
- Commission reconciliation
- Profit margins by booking type

C. Operational Reports
- Tasks overdue by agent
- Response time to leads
- Client satisfaction scores (from post-trip surveys)
- Repeat client rate

D. Marketing Reports
- Lead source effectiveness (which channel brings best clients)
- Email open/click rates
- Campaign ROI



10. MOBILE APP (Essential for Agents)

Features:
- View today's tasks and departures
- Quick client lookup (phone numbers, emergency contacts)
- Add notes/photos from site inspections
- Receive push notifications for urgent updates
- Offline access to itineraries (for airport pickups)
- Quick WhatsApp/call from client profile



 🇲🇽 MEXICO-SPECIFIC CONSIDERATIONS

Regulatory & Compliance:
- SECTUR Registration: If agency is registered with Secretaría de Turismo, track registration numbers
- Civil Protection: Emergency protocols for natural disasters (hurricanes, earthquakes)
- Data Privacy: LFPDPPP (Mexican data protection law) compliance for client data
- Tax: CFDI invoicing integration, ISR and IVA calculations

Market Specifics:
- Payment Culture: Support for "meses sin intereses" (installment payments) tracking
- WhatsApp Dominance: Heavy emphasis on WhatsApp Business integration over email
- Seasonality: High/Low season pricing, Semana Santa, Día de Muertos, Christmas/New Year peaks
- Destinations: Specialized modules for popular Mexican destinations (Riviera Maya, Los Cabos, Puerto Vallarta, CDMX, Oaxaca, Chiapas) and international (Europe, US, Asia)

Language:
- Bilingual Interface: Spanish/English toggle (agents may prefer Spanish, some clients English)
- Communication Templates: Spanish and English versions



👥 USER ROLES & PERMISSIONS

1. Administrator/Owner:
- Full access to all modules
- Financial reports, commission settings
- User management, permission settings
- Supplier contract management

2. Senior Travel Agent:
- Full booking and client management
- View team pipeline (read-only others' deals)
- Access to financial data for their bookings only
- Can override prices/discounts within limits

3. Travel Agent:
- Manage own clients and bookings
- Create quotes and itineraries
- Process payments (with supervisor approval for refunds)
- Cannot see other agents' commission details

4. Operations/Back Office:
- Manage supplier confirmations
- Handle document collection
- Process payments and invoicing
- No sales/commission access



🔧 TECHNICAL SPECIFICATIONS

Integration Requirements:
- Communication: WhatsApp Business API, Twilio for SMS, Instagram & Facebook Messenger
- Calendar: Google Calendar, Outlook 365
- Email: Gmail, Outlook integration
- Storage: Google Drive, Dropbox for documents

- !Hotel APIs: Booking.com, Expedia Partner Central, direct hotel extranets!
- !Payment Gateways: Stripe, Mercado Pago, PayPal, Clip (popular in Mexico)!
- !Accounting: QuickBooks Online, Xero, or Contpaqi!


🎯 KEY SUCCESS METRICS TO TRACK

1. Lead Response Time: < 2 hours during business hours
2. Quote-to-Booking Conversion: Target 25-35%
3. Client Retention Rate: % of repeat bookers
4. Average Response Time: For client inquiries
5. Task Completion Rate: On-time follow-ups
6. Revenue per Agent: Monthly targets
7. Customer Satisfaction: Post-trip NPS score
