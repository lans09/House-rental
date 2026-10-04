HOUSEONE

Business Requirements Document (BRD)

Digital Rental Property Marketplace for Eastern Nigeria (South-East)

Prepared for: Executive Management, Investors, Product, Engineering, QA, DevOps, Marketing, Customer Support, Legal & Compliance

Document Version: 1.0

Date: July 2026

Classification: Confidential – Internal & Investor Use

Document Control

Version History


--- TABLE START ---

| Version | Date | Author | Description |

| 0.1 | July 2026 | Business Analysis Team | Initial draft for internal review |

| 1.0 | July 2026 | Business Analysis Team | Baseline BRD approved for SDLC use |

--- TABLE END ---


Distribution List

Executive Management

Investors / Board

Product Management

Business Analysis

Software Development (Backend, Frontend, Mobile)

UI/UX Design

Quality Assurance

DevOps / Infrastructure

Digital Marketing

Customer Support

Legal & Compliance

Purpose of this Document

This Business Requirements Document (BRD) defines the business, functional, and non-functional requirements for HouseOne, a Nigerian digital property rental marketplace. It is the authoritative business reference throughout the Software Development Life Cycle (SDLC) and is intended for use by Executive Management, Investors, Product Managers, Business Analysts, Software Developers, UI/UX Designers, QA Engineers, DevOps Engineers, the Digital Marketing team, Customer Support, and Legal & Compliance.

Table of Contents

1. Executive Summary

HouseOne is a digital property rental marketplace built for the Nigerian market, connecting property seekers with landlords, property managers, and licensed estate agents. The platform digitises apartment hunting — historically a fragmented, high-friction process reliant on informal referrals, unlicensed agents, and physical inspection of every candidate property — by centralising verified, richly detailed listings with transparent pricing, photography, and direct contact channels.

Modelled on proven marketplace patterns from platforms such as Zillow, Rightmove, Zoopla, Realtor.com, and PropertyPro, HouseOne is purpose-built around the distinct realities of the Nigerian rental market: multi-year upfront rent payments, agency and legal fees layered atop annual rent, a fragmented and largely informal agent ecosystem, and a documented, persistent problem of rental fraud and duplicate advertising.

This document translates the business vision into a structured set of requirements — functional and non-functional — a full role-based permission model, over 50 user stories, core process workflows, a risk register, and measurable success metrics, so that the specification can be carried directly into design, development, QA, and go-to-market execution without requiring re-interpretation of business intent at each stage.

1.1 Strategic Rationale

Nigeria's rental market remains predominantly offline and agent-intermediated, with pricing opacity and fraud eroding renter trust. A verified-listing marketplace addresses a clear, quantifiable pain point while creating durable revenue streams (subscriptions, featured placements, verification fees, and advertising) around a defensible trust layer that is difficult for informal competitors to replicate at scale.

1.2 Document Scope

This BRD covers the end-to-end HouseOne platform: user registration and authentication; property listing, search, and discovery; verification workflows; role-specific dashboards for landlords, agents, property managers, and administrators; in-platform communication and inspection scheduling; reviews and fraud reporting; subscription monetisation; analytics; and customer support. It defines functional requirements, non-functional requirements, RBAC, business rules, user stories, process flows, risks, and KPIs, but does not specify low-level technical architecture, database schemas, or UI pixel-level design — these are downstream artefacts (Solution Design Document, Data Model, UI Style Guide) that this BRD feeds into.

2. Business Problem

Property seekers in Nigeria consistently encounter the following challenges when searching for rental accommodation:

Fake or non-existent property listings used to defraud prospective renters.

Multiple agents independently advertising the same property with inconsistent prices and terms.

Hidden or undisclosed agency, legal, and caution fees discovered only after commitment.

Inaccurate or outdated rental prices that do not reflect the true cost of a tenancy.

Absence of any independent verification of property ownership or agent legitimacy.

Poor-quality property descriptions lacking the detail needed to make a decision remotely.

Limited or misleading photographs that misrepresent the true condition of a property.

Difficulty reaching legitimate landlords directly, without multiple unlicensed intermediaries.

Time-consuming and costly physical inspections of properties that turn out to be unsuitable or unavailable.

General lack of transparency across pricing, availability, and the identity of the counterparty.

Advance-fee and identity-theft rental scams targeting seekers under time pressure.

A poor overall customer experience with no formal recourse when things go wrong.

HouseOne exists to digitise and improve this process end-to-end — increasing transparency and trust between renters and property owners/agents, and materially reducing the incidence of rental fraud.

3. Business Objectives

The HouseOne platform is designed to achieve the following measurable business objectives:

Digitise the end-to-end rental property search process for Nigerian renters.

Reduce the incidence of rental fraud through mandatory listing verification.

Improve transparency of pricing, fees, and property condition.

Increase trust between renters and landlords/agents through verified profiles and listings.

Increase the number of successful, platform-facilitated rental transactions.

Improve overall customer satisfaction (CSAT) and Net Promoter Score (NPS).

Provide a growing base of verified property listings across major Nigerian cities.

Simplify property discovery through advanced search, filtering, and saved alerts.

Enable landlords to advertise vacant properties directly and efficiently.

Help licensed estate agents generate qualified, trackable leads.

Improve accessibility through responsive web and native mobile platforms.

Establish a scalable, defensible PropTech ecosystem for the wider Nigerian market.

4. Project Scope

4.1 In Scope

Web application and mobile-responsive experience for property seekers, landlords, agents, and property managers.

Property listing creation, search, discovery, and detail pages.

Property verification workflow (document review + inspection + admin approval).

Role-specific dashboards: Agent, Landlord, Property Manager, Admin Portal.

In-platform communication, notifications, and inspection scheduling.

Reviews, ratings, and fraud/complaint reporting.

Subscription plans, featured listings, and payment gateway integration.

Platform analytics and reporting for both administrators and listing owners.

Customer support tooling: FAQ, live chat, and ticketing.

4.2 Out of Scope (Phase 1)

Direct online rent payment / escrow processing between renter and landlord (candidate for a later phase).

Digital tenancy agreement e-signing and legal contract generation.

Property management accounting (rent collection ledgers, maintenance ticketing) beyond basic tenant/enquiry tracking.

Integration with government land registries for automated title verification.

International expansion beyond the Nigerian market.

4.3 Assumptions

Landlords, agents, and property managers are willing to submit ownership/agency documents for verification.

A viable Nigerian payment gateway (e.g., Paystack, Flutterwave) is available for subscription and fee collection.

Sufficient internal or outsourced staffing is available to conduct physical/virtual property inspections at scale.

Users have reasonable access to smartphones and mobile data to use the platform.

4.4 Constraints

Verification throughput is bounded by available inspection staff/capacity, which may limit the rate of new Verified listings.

The platform must comply with the Nigeria Data Protection Act (NDPA) 2023 and applicable Central Bank of Nigeria (CBN) payment regulations.

Nigerian mobile network variability requires the platform to remain performant on lower-bandwidth connections.

4.5 Dependencies

Third-party payment gateway APIs (Paystack / Flutterwave) for subscription and fee processing.

SMS/OTP delivery provider and WhatsApp Business API for notifications and communication.

Mapping provider (e.g., Google Maps Platform) for location capture and display.

Cloud hosting and CDN provider for media storage and delivery at scale.

5. Target Users & Stakeholders

5.1 Property Seekers

Individuals seeking to rent residential or short-let accommodation, including apartments, flats, duplexes, self-contained (self-con) units, shared apartments, student accommodation, short-let apartments, and luxury homes. This group is the platform's primary demand-side user and its core acquisition focus.

5.2 Landlords

Individual property owners who wish to advertise vacant rental properties directly to prospective tenants, with or without engaging an estate agent.

5.3 Estate Agents

Licensed estate agents and agencies listing properties on behalf of landlord clients. Agents are a critical supply-side stakeholder group and a direct revenue source via subscriptions and featured-listing fees.

5.4 Property Managers

Companies or individuals managing rental portfolios on behalf of multiple property owners, typically operating at higher listing volumes than individual landlords or agents.

5.5 HouseOne Administrators

Internal HouseOne staff responsible for platform operations, segmented into distinct roles for separation of duties:

Moderator — listing and account moderation, verification approval/rejection, fraud investigation.

Customer Support — ticket handling, live chat, first-line complaint resolution.

Finance Officer — revenue, subscription, and payment reconciliation reporting; refund processing.

Super Administrator — full platform configuration, role management, and audit oversight.

5.6 Stakeholder Summary


--- TABLE START ---

| Stakeholder | Primary Interest | Engagement Level |

| Executive Management | Strategic direction, ROI, risk oversight | High |

| Investors | Growth trajectory, unit economics, market defensibility | High |

| Property Seekers | Trustworthy, affordable, easy-to-use search experience | High |

| Landlords | Fast, low-cost, credible advertising of vacant units | High |

| Estate Agents / Property Managers | Lead generation and portfolio management tools | High |

| Product Managers | Feature prioritisation aligned to business objectives | High |

| Business Analysts | Traceable requirements and acceptance criteria | High |

| Software Developers | Unambiguous, implementable specifications | High |

| UI/UX Designers | Clear user flows and information architecture | Medium |

| QA Engineers | Testable acceptance criteria per requirement | High |

| DevOps Engineers | Non-functional requirements (availability, scalability) | Medium |

| Digital Marketing | User acquisition funnels and conversion metrics | Medium |

| Customer Support | Support tooling and escalation workflows | Medium |

| Legal & Compliance | Data protection, liability, and regulatory alignment | High |

--- TABLE END ---


6. Platform Modules Overview

HouseOne is composed of fifteen core modules. Each module is described here at a business level; detailed functional requirements for every module are provided in Section 7.


--- TABLE START ---

| Module | Business Description |

| 1. User Registration | Role-based sign-up (Seeker, Landlord, Agent, Property Manager) via email, phone/OTP, Google, Apple, or Facebook. |

| 2. User Authentication | Login, password recovery, multi-factor authentication, and session management. |

| 3. User Profile | Profile management, preferred locations, saved searches, favourites, and notification preferences. |

| 4. Property Listing | Creation and management of listings with full pricing, images, location, specification, and media detail. |

| 5. Property Search | Advanced filtering, sorting, and saved-search alerting across the listing catalogue. |

| 6. Property Details Page | Rich listing view with gallery, price breakdown, map, nearby amenities, and contact options. |

| 7. Property Verification | Document review, inspection, and admin approval workflow culminating in a Verified badge. |

| 8. Agent Dashboard | Listing management, enquiry tracking, subscription status, and performance analytics for agents. |

| 9. Landlord Dashboard | Listing creation, tenant/enquiry visibility, and document management for landlords. |

| 10. Admin Portal | Centralised operations console: user/listing moderation, verification, complaints, reporting, and configuration. |

| 11. Communication Module | In-app messaging, email/SMS/push/WhatsApp notifications, and inspection scheduling. |

| 12. Reviews & Ratings | Verified-renter reviews of landlords/agents/properties and independent fraud reporting. |

| 13. Subscription & Monetisation | Tiered subscriptions, featured/sponsored listings, advertising, and payment processing. |

| 14. Analytics | Platform-wide and per-listing metrics covering usage, conversion, and revenue. |

| 15. Customer Support | FAQ/help centre, live chat, ticketing, and complaint escalation. |

--- TABLE END ---


7. Functional Requirements

The following functional requirements are grouped by module. Each requirement is uniquely identified, prioritised using MoSCoW (Must/Should/Could Have), and specified with actors, business rules, pre/postconditions, and Gherkin-style acceptance criteria to support direct translation into development tickets and QA test cases.

7.1 User Registration


--- TABLE START ---

| Requirement ID | FR-REG-001 |

| Module | User Registration |

| Description | The system shall allow a new user to register as a Property Seeker, Landlord, Estate Agent, or Property Manager by selecting a role during sign-up. |

| Priority | Must Have |

| Actors | Property Seeker, Landlord, Estate Agent, Property Manager |

| Business Rules | Each account is bound to exactly one primary role at registration; role upgrades (e.g., Seeker to Agent) require a separate verification workflow. |

| Precondition | User has a valid email address or phone number and is not already registered. |

| Postcondition | A new user account is created in an 'Unverified' state pending OTP confirmation. |

| Acceptance Criteria | Given a user provides valid registration details, when they submit the form, then an account is created and an OTP is sent to their email/phone within 60 seconds. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-REG-002 |

| Module | User Registration |

| Description | The system shall verify new accounts via a One-Time Password (OTP) sent by SMS or email. |

| Priority | Must Have |

| Actors | All registering users |

| Business Rules | OTP expires after 10 minutes; a maximum of 5 verification attempts is allowed before the OTP is invalidated and a new one must be requested. |

| Precondition | User has submitted registration details. |

| Postcondition | Account status changes from 'Unverified' to 'Active' upon correct OTP entry. |

| Acceptance Criteria | Given a correct OTP is entered within the validity window, when the user submits it, then the account becomes Active and the user is redirected to profile setup. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-REG-003 |

| Module | User Registration |

| Description | The system shall support social sign-up/login via Google, Apple, and Facebook. |

| Priority | Should Have |

| Actors | All users |

| Business Rules | Social sign-up must still capture a phone number for OTP-based two-factor security before the account is marked fully active. |

| Precondition | User has an active account with the chosen social provider. |

| Postcondition | A HouseOne account is created and linked to the social identity provider. |

| Acceptance Criteria | Given a user authorizes via Google/Apple/Facebook, when authentication succeeds, then a HouseOne profile is created or matched by email and the user is signed in. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-REG-004 |

| Module | User Registration |

| Description | The system shall require Estate Agents and Property Managers to submit business/licensing documents during registration for later verification. |

| Priority | Must Have |

| Actors | Estate Agent, Property Manager, Admin |

| Business Rules | Agents cannot publish listings until documents are reviewed and approved by an Admin. |

| Precondition | Agent/Manager has completed basic registration. |

| Postcondition | Documents are stored and a verification request is queued for Admin review. |

| Acceptance Criteria | Given an agent uploads a CAC certificate and valid ID, when submitted, then the account is placed in 'Pending Verification' status visible to Admins. |

--- TABLE END ---


7.2 User Authentication


--- TABLE START ---

| Requirement ID | FR-AUTH-001 |

| Module | User Authentication |

| Description | The system shall allow registered users to log in using email/phone and password, or via linked social accounts. |

| Priority | Must Have |

| Actors | All users |

| Business Rules | Accounts are locked for 15 minutes after 5 consecutive failed login attempts. |

| Precondition | User holds an Active account. |

| Postcondition | A secure session token is issued and the user is redirected to their dashboard. |

| Acceptance Criteria | Given valid credentials are entered, when the user submits the login form, then the user is authenticated and redirected within 3 seconds. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-AUTH-002 |

| Module | User Authentication |

| Description | The system shall provide a 'Forgot Password' flow using a time-limited reset link or OTP. |

| Priority | Must Have |

| Actors | All users |

| Business Rules | Reset links expire after 15 minutes and can be used only once. |

| Precondition | User has a registered, verified account. |

| Postcondition | Password is updated and all other active sessions are invalidated. |

| Acceptance Criteria | Given a user requests a reset link, when they set a new password meeting complexity rules, then they can log in with the new password immediately. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-AUTH-003 |

| Module | User Authentication |

| Description | The system shall support optional Multi-Factor Authentication (MFA) via OTP for Landlords, Agents, Property Managers, and all Admin roles. |

| Priority | Should Have |

| Actors | Landlord, Estate Agent, Property Manager, Admin |

| Business Rules | MFA is mandatory (not optional) for all Admin Portal roles. |

| Precondition | User has enabled MFA in security settings, or holds an Admin role. |

| Postcondition | Login requires both password and a valid second-factor code. |

| Acceptance Criteria | Given MFA is enabled, when a user logs in with correct password, then they are prompted for an OTP before session issuance. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-AUTH-004 |

| Module | User Authentication |

| Description | The system shall allow users to view and revoke active sessions/devices from their account settings. |

| Priority | Could Have |

| Actors | All users |

| Business Rules | Revoking a session immediately invalidates the corresponding token. |

| Precondition | User is logged in on at least one device. |

| Postcondition | Selected sessions are terminated. |

| Acceptance Criteria | Given a user selects 'Log out of this device', when confirmed, then that device's session token is invalidated within 1 minute. |

--- TABLE END ---


7.3 User Profile


--- TABLE START ---

| Requirement ID | FR-PROF-001 |

| Module | User Profile |

| Description | The system shall allow users to create and edit a profile including photo, name, phone, email, and preferred locations. |

| Priority | Must Have |

| Actors | All users |

| Business Rules | Email cannot be changed without re-verification via OTP. |

| Precondition | User is authenticated. |

| Postcondition | Profile changes are saved and reflected across the platform. |

| Acceptance Criteria | Given a user updates their profile photo and name, when they save, then the changes are visible on their public profile within seconds. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-PROF-002 |

| Module | User Profile |

| Description | The system shall allow Property Seekers to save searches and favourite properties for later retrieval. |

| Priority | Must Have |

| Actors | Property Seeker |

| Business Rules | A maximum of 20 saved searches and 50 favourites per account applies to free-tier users. |

| Precondition | User is authenticated and viewing a search result or property. |

| Postcondition | The search/property is stored against the user's profile. |

| Acceptance Criteria | Given a seeker clicks 'Save Search', when confirmed, then the search criteria appears under 'Saved Searches' and can be re-run with one click. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-PROF-003 |

| Module | User Profile |

| Description | The system shall allow users to configure notification preferences across email, SMS, and WhatsApp channels. |

| Priority | Should Have |

| Actors | All users |

| Business Rules | Transactional notifications (OTP, payment receipts) cannot be disabled. |

| Precondition | User is authenticated. |

| Postcondition | Notification preferences are stored and applied to future events. |

| Acceptance Criteria | Given a user disables email notifications for 'New matching listings', when a match occurs, then no email is sent but in-app notification still appears. |

--- TABLE END ---


7.4 Property Listing


--- TABLE START ---

| Requirement ID | FR-LIST-001 |

| Module | Property Listing |

| Description | The system shall allow Landlords, Agents, and Property Managers to create a property listing capturing title, type, category, pricing breakdown (rent, service charge, caution fee, agency fee, legal fee), full location hierarchy (State, LGA, Area, Street, Landmark, map pin), rooms, size, description, amenities, media, and availability. |

| Priority | Must Have |

| Actors | Landlord, Estate Agent, Property Manager |

| Business Rules | A listing cannot be published without at least 3 photographs and a complete pricing breakdown. |

| Precondition | User has a verified, active account with listing permission. |

| Postcondition | Listing is created in 'Draft' or 'Pending Verification' status. |

| Acceptance Criteria | Given all mandatory fields are completed, when the user submits the listing, then it enters the verification queue and a confirmation is shown. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-LIST-002 |

| Module | Property Listing |

| Description | The system shall detect and flag potential duplicate listings (same address, similar price and specs) submitted by different agents. |

| Priority | Must Have |

| Actors | Estate Agent, Landlord, Admin |

| Business Rules | Duplicate detection compares normalized address, GPS coordinates within 50m, and price within 5% variance. |

| Precondition | A new listing is submitted for verification. |

| Postcondition | Flagged listings are routed to Admin for manual reconciliation before publishing. |

| Acceptance Criteria | Given a new listing closely matches an existing verified listing, when submitted, then it is auto-flagged as 'Possible Duplicate' for Admin review. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-LIST-003 |

| Module | Property Listing |

| Description | The system shall allow listing owners to upload photographs, and an optional virtual/360 tour. |

| Priority | Should Have |

| Actors | Landlord, Estate Agent, Property Manager |

| Business Rules | Maximum 25 images per listing; images are auto-compressed on upload. |

| Precondition | Listing exists in Draft state. |

| Postcondition | Media assets are attached to the listing record. |

| Acceptance Criteria | Given a user uploads 10 images, when upload completes, then thumbnails render in the listing gallery within 30 seconds. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-LIST-004 |

| Module | Property Listing |

| Description | The system shall automatically expire listings after a configurable period (default 60 days) and prompt owners to renew or mark as let. |

| Priority | Must Have |

| Actors | Landlord, Estate Agent, Property Manager, System |

| Business Rules | Expired listings are hidden from search but retained in the owner's dashboard for 90 days before archival. |

| Precondition | Listing has been live for the configured duration. |

| Postcondition | Listing status changes to 'Expired' and is removed from public search results. |

| Acceptance Criteria | Given a listing reaches its expiry date, when the daily expiry job runs, then the owner receives a renewal reminder 7 days prior and on the expiry date. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-LIST-005 |

| Module | Property Listing |

| Description | The system shall allow listing owners to mark a property as 'Rented/Let' or simply ‘delete’ to remove it from active search immediately. |

| Priority | Must Have |

| Actors | Landlord, Estate Agent, Property Manager |

| Business Rules | A listing marked as let cannot be reactivated; a new listing must be created for future vacancies. User must provide reason to delete a listing |

| Precondition | Listing is currently Active. |

| Postcondition | Listing status changes to 'Let' and is excluded from search and recommendations. |

| Acceptance Criteria | Given an owner selects 'Mark as Rented' or ‘Delete’, when confirmed, then the listing disappears from public search within 1 minute. |

--- TABLE END ---


7.5 Property Search


--- TABLE START ---

| Requirement ID | FR-SRCH-001 |

| Module | Property Search |

| Description | The system shall provide advanced search and filtering by location (State, City, LGA, Neighbourhood), price range, bedrooms, bathrooms, property type, and amenities. |

| Priority | Must Have |

| Actors | Property Seeker, Guest User |

| Business Rules | Filters are combinable (AND logic); results update without full page reload. |

| Precondition | None (available to guests and authenticated users). |

| Postcondition | A filtered, paginated set of matching listings is displayed. |

| Acceptance Criteria | Given a user selects 'Enugu', '2 bedrooms', and 'Verified only', when applied, then only verified 2-bedroom Enugu listings are returned in under 2 seconds. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-SRCH-002 |

| Module | Property Search |

| Description | The system shall allow sorting of search results by Newest, Price (Low-High / High-Low), Popularity, and Verified-first. |

| Priority | Must Have |

| Actors | Property Seeker, Guest User |

| Business Rules | Default sort order is 'Verified first, then Newest'. |

| Precondition | A search has returned at least one result. |

| Postcondition | Result order is re-rendered per the selected sort criterion. |

| Acceptance Criteria | Given a user selects 'Price: Low to High', when applied, then results re-order ascending by monthly-equivalent rent within 1 second. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-SRCH-003 |

| Module | Property Search |

| Description | The system shall allow users to save a search and receive alerts when new matching listings are published. |

| Priority | Should Have |

| Actors | Property Seeker |

| Business Rules | Alert emails are batched and sent at most once per day per saved search to avoid notification fatigue. |

| Precondition | User is authenticated and has run a search. |

| Postcondition | A saved-search alert subscription is created. |

| Acceptance Criteria | Given a new listing matches a saved search, when the listing is published, then the seeker receives a notification within 12 hours. |

--- TABLE END ---


7.6 Property Details Page


--- TABLE START ---

| Requirement ID | FR-DTL-001 |

| Module | Property Details Page |

| Description | The system shall display a full property detail page including photo gallery, price breakdown, features, amenities, location map, nearby points of interest, and owner/agent contact options (Call, WhatsApp, Email). Contact detail is shown to only registered users |

| Priority | Must Have |

| Actors | Property Seeker, Guest User |

| Business Rules | Direct landlord phone numbers are only revealed to authenticated users; guests must register to view contact details. |

| Precondition | A published, active listing exists. |

| Postcondition | Page renders with all listing data and interaction options. |

| Acceptance Criteria | Given a registered seeker opens a listing, when the page loads, then gallery, price breakdown, and map render within 2 seconds on a standard broadband connection. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-DTL-002 |

| Module | Property Details Page |

| Description | The system shall allow users to save, share, and report a property listing directly from the details page. |

| Priority | Must Have |

| Actors | Property Seeker |

| Business Rules | Reported listings are auto-suspended from search after 3 independent reports pending Admin review. |

| Precondition | User is viewing a listing. |

| Postcondition | The action (save/share/report) is recorded against the listing and/or user profile. |

| Acceptance Criteria | Given a seeker reports a listing as fraudulent, when submitted with a reason, then the report is logged and an Admin is notified within minutes. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-DTL-003 |

| Module | Property Details Page |

| Description | The system shall display a curated list of similar properties based on location, price range, and property type. |

| Priority | Could Have |

| Actors | Property Seeker, Guest User |

| Business Rules | Similar properties must be Verified and Active; a minimum of 3 and maximum of 8 are shown. |

| Precondition | The current listing has at least 3 comparable Active listings. |

| Postcondition | A 'Similar Properties' carousel renders below the main listing. |

| Acceptance Criteria | Given a listing in Onitsha within a given price band, when the page loads, then similar Onitsha listings of the same type are shown. |

--- TABLE END ---


7.7 Property Verification


--- TABLE START ---

| Requirement ID | FR-VER-001 |

| Module | Property Verification |

| Description | The system shall require ownership/agency documents (e.g., title document, tenancy agreement, letter of authority, survey plan, agent's CAC certificate) to be uploaded before a listing can be marked Verified. |

| Priority | Must Have |

| Actors | Landlord, Estate Agent, Property Manager, Admin |

| Business Rules | Accepted formats are PDF, JPG, PNG up to 10MB per file. |

| Precondition | A listing exists in 'Pending Verification' status. |

| Postcondition | Documents are attached to the verification case file. |

| Acceptance Criteria | Given required documents are uploaded, when submitted, then the verification case moves to 'Awaiting Admin Review'. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-VER-002 |

| Module | Property Verification |

| Description | The system shall support a manual physical/virtual inspection step conducted by a HouseOne verification agent prior to badge approval. |

| Priority | Must Have |

| Actors | Admin (Verification Officer) |

| Business Rules | Inspection must be completed within 5 business days of document submission (SLA). |

| Precondition | Documents have passed initial desk review. |

| Postcondition | Inspection outcome (Pass/Fail) is recorded against the listing. |

| Acceptance Criteria | Given that an inspection is completed and passed, when the officer submits the report, then the listing is eligible for final Admin approval. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-VER-003 |

| Module | Property Verification |

| Description | The system shall display a 'Verified' badge on listings that have completed document review and inspection successfully, and shall allow rejection with a documented reason. |

| Priority | Must Have |

| Actors | Admin, Property Seeker (viewer) |

| Business Rules | Rejected listings can be resubmitted once after addressing the stated deficiencies. |

| Precondition | Inspection outcome has been recorded. |

| Postcondition | Listing status becomes 'Verified' or 'Rejected' with an owner-visible reason. |

| Acceptance Criteria | Given inspection passes and Admin approves, when confirmed, then a green 'Verified' badge appears on the listing within 5 minutes. |

--- TABLE END ---


7.8 Agent Dashboard


--- TABLE START ---

| Requirement ID | FR-AGT-001 |

| Module | Agent Dashboard |

| Description | The system shall provide agents with a dashboard summarising active listings, enquiries received, subscription status, and performance analytics (views, favourites, leads). |

| Priority | Must Have |

| Actors | Estate Agent |

| Business Rules | Analytics refresh at least every 24 hours. |

| Precondition | Agent has an active, verified account. |

| Postcondition | Dashboard displays current metrics. |

| Acceptance Criteria | Given an agent logs in, when the dashboard loads, then it shows total active listings, new enquiries in the last 7 days, and view counts. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-AGT-002 |

| Module | Agent Dashboard |

| Description | The system shall allow agents to manage (edit, renew, deactivate) all their listings from a single interface. |

| Priority | Must Have |

| Actors | Estate Agent/property manager |

| Business Rules | Edits to a Verified listing that change price or location trigger re-verification. |

| Precondition | Agent owns one or more listings. |

| Postcondition | Listing changes are saved and, where applicable, verification status is reset. |

| Acceptance Criteria | Given an agent edits the price of an existing listing or deactivate, when saved, then the listing goes back to pending for admin review and approval |

--- TABLE END ---


7.9 Landlord Dashboard


--- TABLE START ---

| Requirement ID | FR-LND-001 |

| Module | Landlord Dashboard |

| Description | The system shall allow landlords to create and manage listings, view enquiries, and upload ownership documents from a personal dashboard. |

| Priority | Must Have |

| Actors | Landlord |

| Business Rules | Landlords are limited to 1 free active listings; subsequent listings require a paid plan. |

| Precondition | Landlord has a verified account. |

| Postcondition | Dashboard reflects current listing count against plan limits. |

| Acceptance Criteria | Given a landlord with 1 active listings attempts to create a 2nd, when they submit, then they are prompted to upgrade their plan. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-LND-002 |

| Module | Landlord Dashboard |

| Description | The system shall allow landlords to view basic tenant/enquiry records associated with their properties. |

| Priority | Should Have |

| Actors | Landlord |

| Business Rules | Tenant contact data is only visible after an enquiry has been accepted by the landlord. |

| Precondition | One or more enquiries exist for the landlord's listings. |

| Postcondition | Enquiry list is displayed with status (New, Contacted, Closed). |

| Acceptance Criteria | Given a new enquiry is received, when the landlord opens 'Enquiries', then the enquiry appears with seeker name and message. |

--- TABLE END ---


7.10 Admin Portal


--- TABLE START ---

| Requirement ID | FR-ADM-001 |

| Module | Admin Portal |

| Description | The system shall provide a central Admin Portal for user management, listing moderation, verification workflows, complaint handling, content management, and reporting. |

| Priority | Must Have |

| Actors | Moderator, Customer Support, Finance Officer, Super Administrator |

| Business Rules | All administrative actions are recorded in an immutable audit log. |

| Precondition | Admin user is authenticated with appropriate role permissions. |

| Postcondition | Requested administrative action is executed and logged. |

| Acceptance Criteria | Given a Moderator suspends a fraudulent listing, when confirmed, then the listing is hidden from search and the action is timestamped in the audit log. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-ADM-002 |

| Module | Admin Portal |

| Description | The system shall provide role management allowing Super Administrators to assign and revoke admin roles and permissions. |

| Priority | Must Have |

| Actors | Super Administrator |

| Business Rules | Only Super Administrators may create or modify other admin roles. |

| Precondition | Super Admin is authenticated. |

| Postcondition | Role assignment is updated and takes effect on the user's next request. |

| Acceptance Criteria | Given a Super Admin assigns the 'Finance Officer' role to a staff account, when saved, then that account gains access to revenue reports immediately. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-ADM-003 |

| Module | Admin Portal |

| Description | The system shall provide revenue, subscription, and platform-usage reports exportable to CSV/Excel. |

| Priority | Should Have |

| Actors | Finance Officer, Super Administrator |

| Business Rules | Financial reports must reconcile with the payment gateway settlement records. |

| Precondition | Transactional data exists for the requested period. |

| Postcondition | A report file is generated and made available for download. |

| Acceptance Criteria | Given a Finance Officer selects a monthly revenue report, when generated, then totals match the payment gateway dashboard for the same period. |

--- TABLE END ---


7.11 Communication Module


--- TABLE START ---

| Requirement ID | FR-COM-001 |

| Module | Communication Module |

| Description | The system shall provide in-app messaging between Property Seekers and Landlords/Agents, alongside email, SMS, push, and WhatsApp notification channels. |

| Priority | Must Have |

| Actors | Property Seeker, Landlord, Estate Agent, Property Manager |

| Business Rules | Phone numbers are masked in-app until both parties opt to share direct contact. |

| Precondition | A user initiates an enquiry on a listing. |

| Postcondition | A message thread is created and both parties are notified. |

| Acceptance Criteria | Given a seeker sends an enquiry, when submitted, then the landlord/agent receives an in-app and push notification within 1 minute. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-COM-002 |

| Module | Communication Module |

| Description | The system shall allow seekers to request and schedule a property inspection appointment through the platform. |

| Priority | Should Have |

| Actors | Property Seeker, Landlord, Estate Agent |

| Business Rules | Inspection slots must be confirmed by the owner/agent within 24 hours or the request expires. |

| Precondition | A message thread exists for the listing. |

| Postcondition | An inspection booking record is created with date/time and status. |

| Acceptance Criteria | Given a seeker proposes an inspection time, when the agent accepts, then both parties receive a calendar confirmation notification. |

--- TABLE END ---


7.12 Reviews & Ratings


--- TABLE START ---

| Requirement ID | FR-REV-001 |

| Module | Reviews & Ratings |

| Description | The system shall allow users to submit reviews and star ratings for landlords, agents, and properties. |

| Priority | Should Have |

| Actors | Property Seeker (verified renter) |

| Business Rules | One review per user per completed transaction; reviews are moderated before publishing. |

| Precondition | User has an accepted enquiry or confirmed rental linked to the listing. |

| Postcondition | Review is queued for moderation and published upon approval. |

| Acceptance Criteria | Given a verified renter submits a review with a 1-5 star rating, when submitted, then it appears as 'Pending' until Admin approval. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-REV-002 |

| Module | Reviews & Ratings |

| Description | The system shall allow any user to report a listing or user profile suspected of fraud, independent of the review system. |

| Priority | Must Have |

| Actors | Property Seeker, Landlord, Estate Agent |

| Business Rules | Reports must include a reason category and optional evidence upload. |

| Precondition | User is viewing the listing or profile in question. |

| Postcondition | A fraud report case is created and routed to the Moderator queue. |

| Acceptance Criteria | Given a user files a fraud report, when submitted, then a case is created and visible in the Admin complaint queue within 1 minute. |

--- TABLE END ---


7.13 Subscription & Monetisation


--- TABLE START ---

| Requirement ID | FR-SUB-001 |

| Module | Subscription & Monetisation |

| Description | The system shall offer tiered subscription plans for Agents and Property Managers (e.g., Basic, Premium, Enterprise) governing listing limits, featured placement, and analytics access. |

| Priority | Must Have |

| Actors | Estate Agent, Property Manager, Finance Officer |

| Business Rules | Plan changes take effect immediately for upgrades and at the next billing cycle for downgrades. |

| Precondition | Agent/Manager account is active. |

| Postcondition | Subscription tier and entitlements are updated on the account. |

| Acceptance Criteria | Given an agent upgrades to Premium, when payment succeeds, then their listing limit and featured-listing quota update immediately. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-SUB-002 |

| Module | Subscription & Monetisation |

| Description | The system shall allow owners to purchase 'Featured' or 'Sponsored' placement for individual listings for a defined duration. |

| Priority | Should Have |

| Actors | Landlord, Estate Agent, Property Manager |

| Business Rules | A maximum of 20 featured listings are shown per search results page/region at any time, allocated by purchase recency and relevance. |

| Precondition | Listing is Active and Verified. |

| Postcondition | Listing receives elevated placement in search and homepage carousels. |

| Acceptance Criteria | Given a user purchases 7-day featured placement, when payment is confirmed, then the listing appears in the featured carousel within 10 minutes. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-SUB-003 |

| Module | Subscription & Monetisation |

| Description | The system shall integrate with Nigerian payment gateways (e.g., Paystack, Flutterwave) to process subscription, featured-listing, and verification-fee payments. |

| Priority | Must Have |

| Actors | Landlord, Estate Agent, Property Manager, Finance Officer |

| Business Rules | All payments must be reconciled nightly against gateway settlement reports; failed payments trigger automatic retry per gateway rules. |

| Precondition | User has selected a paid plan or add-on. |

| Postcondition | Payment is processed and a receipt is issued. |

| Acceptance Criteria | Given a user completes checkout via Paystack, when payment is confirmed, then a receipt is emailed and the entitlement is activated within 2 minutes. |

--- TABLE END ---


7.14 Analytics


--- TABLE START ---

| Requirement ID | FR-ANL-001 |

| Module | Analytics |

| Description | The system shall provide an Admin analytics dashboard covering daily/monthly active users, listings created, verification throughput, most-searched locations, and conversion rates. |

| Priority | Should Have |

| Actors | Admin, Finance Officer, Super Administrator |

| Business Rules | Dashboard data must not lag live data by more than 24 hours. |

| Precondition | Platform has recorded usage events. |

| Postcondition | Aggregated metrics are displayed with date-range filtering. |

| Acceptance Criteria | Given an Admin selects 'Last 30 days', when applied, then all charts refresh to reflect that date range within 5 seconds. |

--- TABLE END ---



--- TABLE START ---

| Requirement ID | FR-ANL-002 |

| Module | Analytics |

| Description | The system shall track and expose per-listing performance metrics (views, favourites, enquiries) to the listing owner. |

| Priority | Should Have |

| Actors | Landlord, Estate Agent, Property Manager |

| Business Rules | View counts exclude the owner's own visits to their listing. |

| Precondition | Listing has been published and viewed at least once. |

| Postcondition | Metrics are visible on the owner's dashboard for that listing. |

| Acceptance Criteria | Given a listing receives 50 views in a week, when the owner opens analytics, then the view count and trend chart reflect this figure. |

--- TABLE END ---


7.15 Customer Support


--- TABLE START ---

| Requirement ID | FR-SUP-002 |

| Module | Customer Support |

| Description | The system shall support escalation of unresolved complaints from Customer Support to Moderator or Super Administrator with full case history. |

| Priority | Must Have |

| Actors | Customer Support, Moderator, Super Administrator |

| Business Rules | Escalation must carry forward all prior notes and attachments; no case data may be lost in transfer. |

| Precondition | A ticket has exceeded first-line resolution capability or SLA. |

| Postcondition | Ticket ownership transfers with complete history intact. |

| Acceptance Criteria | Given a ticket is escalated, when the Moderator opens it, then all prior messages, attachments, and timestamps are visible. |

--- TABLE END ---


8. Non-Functional Requirements (NFR)

8.1 Performance

NFR-PERF-001: Search results shall return within 2 seconds for 95% of queries under normal load.

NFR-PERF-002: Listing detail pages shall render primary content (gallery, price, map) within 2 seconds on a standard 4G connection.

NFR-PERF-003: Image and video media shall be served via CDN with adaptive compression to minimise load time on low-bandwidth connections.

8.2 Scalability

NFR-SCAL-001: The platform architecture shall support horizontal scaling to accommodate at least 1,000,000 listings and 5,000,000 registered users without redesign.

NFR-SCAL-002: The search and analytics subsystems shall scale independently of the core transactional database.

8.3 Availability & Reliability

NFR-AVAIL-001: The platform shall maintain a minimum of 99.9% monthly uptime, excluding scheduled maintenance windows.

NFR-AVAIL-002: Scheduled maintenance shall be communicated to users at least 48 hours in advance and scheduled during low-traffic periods.

NFR-REL-001: Payment and verification transactions shall be idempotent to prevent duplicate charges or duplicate verification records on retry.

8.4 Security

NFR-SEC-001: All data in transit shall be encrypted using TLS 1.2 or higher; sensitive data at rest (documents, payment metadata) shall be encrypted.

NFR-SEC-002: Multi-factor authentication shall be mandatory for all Admin Portal roles.

NFR-SEC-003: The platform shall undergo third-party penetration testing at least annually and after major architecture changes.

NFR-SEC-004: Role-Based Access Control (RBAC) shall be enforced at both the API and UI layers (see Section 9).

8.5 Data Privacy & Compliance

NFR-PRIV-001: The platform shall comply with the Nigeria Data Protection Act (NDPA) 2023, including lawful basis for processing, data minimisation, and user consent capture.

NFR-PRIV-002: Users shall be able to request export or deletion of their personal data, subject to legal retention requirements (e.g., financial and audit records).

NFR-PRIV-003: Ownership and identification documents shall be accessible only to authorised verification staff and the document owner.

8.6 Accessibility & Usability

NFR-ACC-001: Core user journeys (search, view listing, contact owner) shall meet WCAG 2.1 AA accessibility guidelines.

NFR-USA-002: The platform shall be fully responsive across mobile, tablet, and desktop breakpoints.

NFR-USA-003: Primary flows shall be usable in English, with consideration for low-literacy users through iconography and progressive disclosure.

8.7 Maintainability, Monitoring & Audit

NFR-MAINT-001: All administrative actions (approvals, suspensions, role changes) shall be recorded in an immutable, timestamped audit log retained for a minimum of 3 years.

NFR-MON-001: Application performance monitoring and error alerting shall be in place for all production services, with on-call escalation for Severity 1 incidents.

NFR-MAINT-002: The codebase shall follow a documented style guide and maintain automated test coverage of at least 70% for core transactional modules.

8.8 Backup, Recovery & Disaster Recovery

NFR-BCK-001: Full database backups shall be taken at least daily, with point-in-time recovery capability of at least 7 days.

NFR-DR-001: The platform shall define a Disaster Recovery Plan with a Recovery Time Objective (RTO) of 4 hours and Recovery Point Objective (RPO) of 1 hour for core transactional data.

8.9 SEO, Browser & Cloud Requirements

NFR-SEO-001: Listing and search pages shall be server-side rendered or pre-rendered to support search engine indexing, with structured data (schema.org RealEstateListing) markup.

NFR-COMPAT-001: The platform shall support the latest two major versions of Chrome, Safari, Firefox, and Edge.

NFR-CLOUD-001: The platform shall be deployed on a cloud infrastructure provider supporting auto-scaling, managed databases, and a CDN for media delivery.

NFR-API-001: Public and partner-facing APIs shall respond within 500ms for 95% of requests and be versioned to support backward compatibility.

NFR-CACHE-001: Frequently accessed, low-volatility data (e.g., location lists, amenity taxonomies) shall be cached with a defined invalidation strategy.

9. User Roles & Permissions (RBAC Matrix)

The following matrix defines platform capabilities against each user role. This is the authoritative reference for access-control implementation at both the API and UI layers.


--- TABLE START ---

| Capability | Property Seeker | Landlord | Estate Agent | Property Manager | Moderator | Customer Support | Finance Officer | Super Admin |

| Browse & search listings | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

| View landlord/agent contact info | ✓* | n/a | n/a | n/a | ✓ | ✓ | – | ✓ |

| Save searches & favourites | ✓ | ✓ | ✓ | ✓ | – | – | – | – |

| Create property listing | – | ✓ | ✓ | ✓ | – | – | – | – |

| Edit own listing | – | ✓ | ✓ | ✓ | – | – | – | ✓ |

| Upload verification documents | – | ✓ | ✓ | ✓ | – | – | – | – |

| Approve/reject property verification | – | – | – | – | ✓ | – | – | ✓ |

| Suspend listing / user account | – | – | – | – | ✓ | – | – | ✓ |

| Submit review / rating | ✓* | – | – | – | – | – | – | – |

| Report fraudulent listing | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ |

| Message landlords/agents | ✓ | ✓ | ✓ | ✓ | – | – | – | – |

| Manage own subscription | – | ✓ | ✓ | ✓ | – | – | – | – |

| View own listing analytics | – | ✓ | ✓ | ✓ | – | – | – | ✓ |

| View platform-wide analytics | – | – | – | – | ✓ | – | ✓ | ✓ |

| Handle support tickets | – | – | – | – | ✓ | ✓ | – | ✓ |

| Escalate complaints | – | – | – | – | ✓ | ✓ | – | ✓ |

| Access revenue & payment reports | – | – | – | – | – | – | ✓ | ✓ |

| Process refunds | – | – | – | – | – | – | ✓ | ✓ |

| Manage content (FAQ, banners) | – | – | – | – | ✓ | – | – | ✓ |

| Assign/revoke admin roles | – | – | – | – | – | – | – | ✓ |

| View audit logs | – | – | – | – | – | – | – | ✓ |

| Configure system settings | – | – | – | – | – | – | – | ✓ |

--- TABLE END ---


✓* = available only once the user is authenticated and, for reviews, verified as having completed a transaction linked to the listing. 'n/a' = not applicable to this role's function. '–' = not permitted.

10. Business Rules

10.1 Listing Approval & Verification

BR-001: A listing shall not appear in public search results until it has passed initial moderation, regardless of the owner's subscription tier.

BR-002: A listing can only display a 'Verified' badge after both document review and physical/virtual inspection have passed and an Admin has granted final approval.

BR-003: Rejected listings may be resubmitted only once after the stated deficiency has been addressed; a second rejection requires Moderator escalation before further resubmission.

10.2 Duplicate Listing Prevention

BR-004: A new listing matching an existing Verified listing on address proximity (within 50m) and price (within 5% variance) shall be automatically flagged as a possible duplicate for manual reconciliation.

BR-005: Where two agents both claim to represent the same property, HouseOne shall require documented proof of current mandate (letter of authority) before either listing is Verified.

10.3 Listing Expiry & Renewal

BR-006: Listings expire after a default period of 60 days unless renewed by the owner; expired listings are removed from public search but retained in the owner's dashboard for 90 days.

BR-007: A listing marked 'Rented/Let' cannot be reactivated; a new listing must be created for any future vacancy at that property.

10.4 Subscription & Monetisation Limits

BR-008: Landlords on the free tier are limited to 5 concurrently active listings; agents and property managers are subject to plan-specific limits defined in the subscription schedule.

BR-009: Subscription upgrades take effect immediately; downgrades take effect at the next billing cycle to avoid mid-cycle loss of paid entitlements.

10.5 Contact Information Visibility

BR-010: Landlord/agent phone numbers are masked within in-app messaging until both parties mutually opt to share direct contact details.

BR-011: Guest (unauthenticated) users may browse and view listing summaries but must register and verify their account to view direct contact details.

10.6 Property Ownership Validation

BR-012: Ownership documents (title document, tenancy agreement, or letter of authority) are mandatory before a listing may proceed to inspection.

BR-013: Estate Agents must hold a current, Admin-approved CAC/business registration on file before any of their listings can be published.

10.7 Fraud Detection & User Suspension

BR-014: A listing that receives 3 or more independent fraud reports is automatically suspended from public search pending Moderator review.

BR-015: A user account associated with 2 or more confirmed fraudulent listings shall be permanently suspended by a Moderator or Super Administrator.

10.8 Refund Policy

BR-016: Subscription and featured-listing fees are refundable within 48 hours of purchase if no material platform benefit (e.g., featured placement impressions) has yet been delivered.

BR-017: Verification fees are non-refundable once a physical or virtual inspection has been conducted, irrespective of the verification outcome.

11. User Stories

The following 52 user stories cover all major platform roles and are structured for direct conversion into an Agile product backlog. Each includes acceptance criteria, priority, and traceability to the functional requirements in Section 7.


--- TABLE START ---

| ID | User Story | Priority | Acceptance Criteria | Dependencies |

| US-01 | As a Property Seeker, I want to search for rental apartments by state, city, and price range, so that I can quickly find properties that match my budget and preferred location. | Must Have | Search returns only listings matching all applied filters within 2 seconds; results are paginated. | FR-SRCH-001 |

| US-02 | As a Property Seeker, I want to filter search results to show only Verified listings, so that I can avoid fraudulent or fake listings. | Must Have | Toggling 'Verified only' immediately removes unverified listings from the result set. | FR-SRCH-001, FR-VER-003 |

| US-03 | As a Property Seeker, I want to view a full photo gallery and video tour of a property, so that I can assess the property remotely before scheduling a physical inspection. | Must Have | Gallery supports swipe/click navigation; video plays inline without leaving the page. | FR-LIST-003, FR-DTL-001 |

| US-04 | As a Property Seeker, I want to save properties to a favourites list, so that I can easily revisit properties I'm interested in without re-searching. | Must Have | Saved property appears under 'My Favourites' and persists across sessions. | FR-PROF-002 |

| US-05 | As a Property Seeker, I want to receive alerts when new listings match my saved search, so that I don't have to manually re-search every day. | Should Have | Alert is sent within 24 hours of a matching listing going live. | FR-SRCH-003 |

| US-06 | As a Property Seeker, I want to contact a landlord or agent directly via WhatsApp, call, or email from the listing page, so that I can quickly ask questions or arrange a viewing. | Must Have | Clicking 'WhatsApp' opens a pre-filled chat referencing the listing ID. | FR-DTL-001, FR-COM-001 |

| US-07 | As a Property Seeker, I want to report a listing that looks fraudulent or misleading, so that I can help keep the platform trustworthy for other renters. | Must Have | Report form requires a reason and optional screenshot; confirmation is shown on submission. | FR-DTL-002, FR-REV-002 |

| US-08 | As a Property Seeker, I want to book a property inspection appointment online, so that I can schedule a viewing without back-and-forth phone calls. | Should Have | Available time slots are shown; booking sends confirmation to both parties. | FR-COM-002 |

| US-09 | As a Property Seeker, I want to leave a review and rating after renting a property, so that I can share my experience to help other renters make informed decisions. | Should Have | Review form is only available after a confirmed transaction; submission requires a star rating and comment. | FR-REV-001 |

| US-10 | As a Property Seeker, I want to compare a property with similar listings nearby, so that I can judge whether the price and features represent good value. | Could Have | A 'Similar Properties' section shows at least 3 comparable listings. | FR-DTL-003 |

| US-11 | As a Property Seeker, I want to sign up quickly using my Google account, so that I can start browsing without filling a long registration form. | Should Have | Google sign-up completes account creation in under 3 steps. | FR-REG-003 |

| US-12 | As a Property Seeker, I want to reset my password if I forget it, so that I can regain access to my account securely. | Must Have | Reset link/OTP is delivered within 60 seconds and expires after 30 minutes. | FR-AUTH-002 |

| US-13 | As a Property Seeker, I want to control which notifications I receive and on which channel, so that I'm not overwhelmed with irrelevant alerts. | Should Have | Toggling off a category stops future notifications of that type on that channel. | FR-PROF-003 |

| US-14 | As a Property Seeker, I want to see a price breakdown (rent, agency fee, caution fee, legal fee) before contacting an agent, so that I know the true total cost upfront and avoid hidden fees. | Must Have | Price breakdown is displayed as a itemised table on the listing page. | FR-LIST-001, FR-DTL-001 |

| US-15 | As a Property Seeker, I want to view a property's location on a map along with nearby schools and hospitals, so that I can evaluate the neighbourhood before committing to a viewing. | Should Have | Map renders with a pin at the listing's coordinates and nearby POI markers. | FR-LIST-001, FR-DTL-001 |

| US-16 | As a Landlord, I want to create a property listing with full pricing and location details, so that I can advertise my vacant property to genuine renters. | Must Have | Listing is saved as Draft; all mandatory fields are validated before submission. | FR-LIST-001 |

| US-17 | As a Landlord, I want to upload ownership documents for verification, so that my listing earns a Verified badge that builds renter trust. | Must Have | Uploaded documents move the listing to 'Awaiting Admin Review'. | FR-VER-001 |

| US-18 | As a Landlord, I want to receive enquiries from interested seekers in one place, so that I don't miss potential tenants across multiple channels. | Must Have | All enquiries appear in a single 'Enquiries' inbox with seeker details. | FR-LND-002, FR-COM-001 |

| US-19 | As a Landlord, I want to mark my property as rented once I've found a tenant, so that I stop receiving further enquiries for an unavailable property. | Must Have | Listing disappears from public search within 1 minute of the status change. | FR-LIST-005 |

| US-20 | As a Landlord, I want to renew my listing before it expires, so that my property remains visible to renters without re-creating it from scratch. | Must Have | Renewal reminder is sent 7 days before expiry; renewal extends the listing by the standard period. | FR-LIST-004 |

| US-21 | As a Landlord, I want to view how many people have viewed or favourited my listing, so that I can gauge interest and adjust my pricing or description. | Should Have | Analytics panel shows views, favourites, and enquiries for the last 30 days. | FR-ANL-002 |

| US-22 | As a Landlord, I want to upgrade to a paid plan when I exceed my free listing limit, so that I can advertise more than 5 properties at once. | Should Have | Attempting a 6th listing on the free tier prompts an upgrade offer. | FR-LND-001, FR-SUB-001 |

| US-23 | As a Landlord, I want to communicate with prospective tenants without exposing my personal number until I'm ready, so that I can screen enquiries safely and reduce nuisance calls. | Should Have | In-app chat masks the landlord's real number until they opt to share it. | FR-COM-001 |

| US-24 | As a Landlord, I want to edit my listing details after publishing, so that I can correct errors or update pricing as needed. | Must Have | Edits to price or location on a Verified listing trigger re-verification. | FR-AGT-002 |

| US-25 | As a Landlord, I want to see the reason my listing was rejected during verification, so that I can correct the issue and resubmit. | Must Have | Rejection notice includes a specific, actionable reason. | FR-VER-003 |

| US-26 | As a Estate Agent, I want to register my agency and upload my CAC certificate, so that I can be verified and start publishing listings on behalf of clients. | Must Have | Submission moves the agent account to 'Pending Verification'. | FR-REG-004 |

| US-27 | As a Estate Agent, I want to manage all my listings from a single dashboard, so that I can efficiently track and update multiple properties I represent. | Must Have | Dashboard lists all listings with status, views, and enquiry counts. | FR-AGT-001, FR-AGT-002 |

| US-28 | As a Estate Agent, I want to view performance analytics for each of my listings, so that I can identify which properties need better photos or pricing adjustments. | Should Have | Analytics refresh at least every 24 hours per listing. | FR-AGT-001, FR-ANL-002 |

| US-29 | As a Estate Agent, I want to purchase featured placement for a high-priority listing, so that the property gets more visibility and faster leads. | Should Have | Featured listing appears in the homepage carousel within 10 minutes of payment. | FR-SUB-002 |

| US-30 | As a Estate Agent, I want to be notified when a duplicate of my listing is flagged, so that I can resolve conflicts with other agents advertising the same property. | Must Have | Notification includes a link to the conflicting listing for comparison. | FR-LIST-002 |

| US-31 | As a Estate Agent, I want to upgrade my subscription plan to unlock more listings and analytics, so that I can grow my business on the platform. | Should Have | Upgrade takes effect immediately and entitlements update in real time. | FR-SUB-001 |

| US-32 | As a Estate Agent, I want to track leads generated from each listing, so that I can measure my return on advertising spend. | Should Have | Lead count reflects enquiries, calls, and WhatsApp clicks per listing. | FR-AGT-001 |

| US-33 | As a Property Manager, I want to manage listings for multiple properties under one company account, so that I can efficiently oversee a large property portfolio. | Must Have | Company account supports multiple staff logins with shared listing access. | FR-LND-001 |

| US-34 | As a Property Manager, I want to view consolidated enquiry and performance reports across my portfolio, so that I can report performance to property owners I represent. | Should Have | Report aggregates views, enquiries, and conversions across all managed listings. | FR-ANL-002 |

| US-35 | As a Property Manager, I want to upload bulk property data via a spreadsheet template, so that I can list many units quickly instead of one at a time. | Could Have | Bulk upload validates each row and reports errors before final import. | FR-LIST-001 |

| US-36 | As a HouseOne Moderator, I want to review newly submitted listings before they go live, so that I can prevent fraudulent or low-quality listings from reaching renters. | Must Have | Moderation queue shows pending listings ordered by submission time. | FR-ADM-001 |

| US-37 | As a HouseOne Moderator, I want to approve or reject property verification requests with documented reasons, so that I maintain data integrity and trust in the Verified badge. | Must Have | Rejection requires a reason selected from a controlled list plus optional notes. | FR-VER-003 |

| US-38 | As a HouseOne Moderator, I want to suspend a listing or user account flagged for fraud, so that I can protect other users from harm in near real time. | Must Have | Suspension takes effect within 1 minute and removes the listing from search. | FR-ADM-001 |

| US-39 | As a Customer Support Agent, I want to view a user's full support ticket history when they contact us, so that I can resolve issues faster with complete context. | Must Have | Ticket history loads with all prior messages, attachments, and resolutions. | FR-SUP-001 |

| US-40 | As a Customer Support Agent, I want to escalate a complex complaint to a Moderator or Super Admin, so that unresolved issues reach someone with the authority to act. | Must Have | Escalated ticket retains full history and is reassigned with an SLA timer reset. | FR-SUP-002 |

| US-41 | As a Finance Officer, I want to generate a monthly revenue report by subscription tier and featured-listing sales, so that I can reconcile platform income against payment gateway settlements. | Must Have | Report totals match the payment gateway dashboard for the same period. | FR-ADM-003 |

| US-42 | As a Finance Officer, I want to view failed and retried payment transactions, so that I can follow up on recoverable revenue and identify gateway issues. | Should Have | Failed transactions list includes retry status and next retry timestamp. | FR-SUB-003 |

| US-43 | As a Super Administrator, I want to assign and revoke admin roles for staff accounts, so that I can control who has access to sensitive platform functions. | Must Have | Role change takes effect on the affected user's next authenticated request. | FR-ADM-002 |

| US-44 | As a Super Administrator, I want to view an immutable audit log of all administrative actions, so that I can investigate incidents and ensure accountability. | Must Have | Audit log entries include actor, action, timestamp, and affected record ID, and cannot be edited or deleted. | FR-ADM-001 |

| US-45 | As a Super Administrator, I want to configure platform-wide settings such as listing expiry duration and subscription pricing, so that I can adapt the platform's rules to changing business needs without a code deployment. | Should Have | Configuration changes apply platform-wide within 5 minutes without downtime. | FR-ADM-001 |

| US-46 | As a Property Seeker, I want to browse listings as a guest before creating an account, so that I can evaluate the platform's value before committing to sign up. | Must Have | Guests can search and view listing summaries but not landlord contact details. | FR-SRCH-001, FR-DTL-001 |

| US-47 | As a Property Seeker, I want to access the platform seamlessly on both mobile web and desktop, so that I can search for properties wherever and whenever is convenient for me. | Must Have | All core flows (search, view, enquire) function correctly at mobile, tablet, and desktop breakpoints. | NFR-USA-002 |

| US-48 | As a Property Seeker, I want to get help from a live chat agent if I have questions while browsing, so that I get quick answers without leaving the platform. | Should Have | Live chat widget is available on all pages during support hours and routes to a queued agent. | FR-SUP-001 |

| US-49 | As a HouseOne Administrator, I want to view platform-wide analytics including most-searched locations and conversion rates, so that I can make data-driven decisions on marketing and product priorities. | Should Have | Dashboard data lags live activity by no more than 24 hours. | FR-ANL-001 |

| US-50 | As a Property Manager, I want to delegate specific listings to individual staff members within my company account, so that accountability and workload are clearly divided across my team. | Could Have | Assigned staff can edit only the listings delegated to them. | FR-LND-001 |

| US-51 | As a Estate Agent, I want to receive a renewal reminder before my listings expire, so that I don't lose visibility on active leads due to an expired listing. | Must Have | Reminder is sent 7 days before expiry and again on the expiry date. | FR-LIST-004 |

| US-52 | As a Property Seeker, I want to be warned before contacting an unverified listing, so that I can make an informed decision about the risk involved. | Should Have | An advisory banner appears on unverified listing pages before contact actions. | FR-DTL-001, FR-VER-003 |

--- TABLE END ---


Business rules applicable to each story are inherited from the corresponding functional requirement(s) referenced in the Dependencies column (see Section 7) and the Business Rules in Section 10.

12. Process Flows

The following workflows describe the end-to-end sequence of steps for key platform processes. These are textual representations suitable for conversion into swimlane or BPMN diagrams during solution design.

12.1 User Registration Flow

1. User selects account type (Seeker, Landlord, Agent, Property Manager).

2. User submits email/phone and creates a password, or signs up via Google/Apple/Facebook.

3. System sends an OTP via SMS or email.

4. User enters OTP; system verifies and activates the account.

5. If Agent or Property Manager, user is prompted to upload business/licensing documents.

6. System places business documents in the Admin verification queue.

7. User is redirected to profile setup / dashboard.

12.2 Property Listing Flow

1. Landlord, Agent, or Property Manager selects 'Create Listing'.

2. User completes property details: title, type, category, pricing breakdown, location, specifications, description, and amenities.

3. User uploads photographs (minimum 3), and optionally a video/virtual tour.

4. User submits the listing; system runs automated duplicate-detection checks.

5. If flagged as a possible duplicate, listing is routed to Admin for manual reconciliation before proceeding.

6. Listing enters the Property Verification workflow (see 12.3).

7. Upon approval, listing status changes to Active/Verified and becomes publicly searchable.

12.3 Property Verification Flow

1. Owner uploads ownership/agency documents (title document, tenancy agreement, letter of authority, or agent CAC certificate).

2. System performs an initial desk review of document completeness.

3. A verification officer schedules and conducts a physical or virtual inspection within the 5-business-day SLA.

4. Inspection outcome (Pass/Fail) is recorded against the listing.

5. Admin reviews the complete case file (documents + inspection outcome) and approves or rejects the listing.

6. If approved, the listing receives a 'Verified' badge visible to all users.

7. If rejected, the owner receives a documented reason and may resubmit once after remediation.

12.4 Property Search Flow

1. User (guest or authenticated) enters a location and/or applies filters (price, bedrooms, type, amenities, verification status).

2. System queries the search index and returns matching, Active listings.

3. User applies sort order (Newest, Price, Popularity, Verified-first).

4. User selects a listing to view full details, or saves the search for future alerts.

5. If saved, the system monitors new listings against the saved criteria and issues a batched alert at most once daily.

12.5 Property Enquiry Flow

1. Seeker views a listing and initiates contact via in-app message, WhatsApp, call, or email.

2. System creates a message thread (for in-app contact) and masks the owner's direct phone number.

3. Owner/Agent receives an in-app and push notification of the new enquiry.

4. Owner/Agent responds within the platform; either party may opt to share direct contact details.

5. Enquiry status is tracked (New, Contacted, Closed) on the owner's dashboard.

12.6 Inspection Booking Flow

1. Within an active enquiry thread, the seeker proposes one or more inspection date/time options.

2. Owner/Agent confirms a slot within 24 hours, or the request expires and the seeker is prompted to propose a new time.

3. Upon confirmation, both parties receive a booking confirmation notification.

4. After the inspection date, either party may leave feedback; a completed inspection linked to a subsequent rental enables the seeker to submit a review (see 12.9 dependency).

12.7 Listing Approval (Moderation) Flow

1. New or edited listing enters the Moderator queue upon submission.

2. Moderator reviews content for policy compliance (no prohibited content, accurate categorisation, appropriate media).

3. Moderator approves (listing proceeds to Verification, Section 12.3) or rejects with a documented reason.

4. Rejected listings are returned to the owner's dashboard with clear guidance for resubmission.

12.8 Complaint Resolution Flow

1. User submits a complaint or fraud report via the listing page, profile page, or Support Ticketing system.

2. System creates a case with a unique reference and routes it to the Customer Support queue.

3. Customer Support attempts first-line resolution within the defined SLA.

4. If unresolved or requiring elevated authority (e.g., account suspension), the case is escalated to a Moderator or Super Administrator with full history intact.

5. Resolution and outcome are recorded and communicated to the complainant.

12.9 Subscription Purchase Flow

1. Agent, Landlord, or Property Manager selects a subscription plan or add-on (e.g., featured listing).

2. User is redirected to the integrated payment gateway (Paystack/Flutterwave) to complete payment.

3. Gateway confirms payment; system activates the corresponding entitlement (listing limit, featured placement, analytics access).

4. System issues a receipt and updates the user's billing record.

5. Nightly reconciliation job cross-checks platform transaction records against gateway settlement reports.

13. Risks & Mitigation

The register below covers business, operational, technical, legal/compliance, and security risks identified for the HouseOne platform, together with proposed mitigations.


--- TABLE START ---

| Category | Risk | Impact | Likelihood | Mitigation |

| Business | Low initial adoption by landlords/agents due to entrenched informal listing habits (word-of-mouth, Facebook groups). | High | Medium | Targeted agent onboarding incentives, free listing tiers, and partnerships with estate surveyor associations. |

| Business | Revenue concentration risk if monetisation relies too heavily on agent subscriptions. | Medium | Medium | Diversify revenue via featured listings, verification fees, and advertising from adjacent services (movers, furniture). |

| Operational | Verification backlog if manual inspection cannot scale with listing volume. | High | Medium | Define SLAs, hire regional verification agents, and introduce a hybrid remote/photo-evidence verification tier for lower-risk listings. |

| Operational | Duplicate listings across multiple agents causing user confusion and complaints. | Medium | High | Automated duplicate-detection algorithm plus a clear admin reconciliation workflow (FR-LIST-002). |

| Technical | Search performance degradation as listing volume scales into the hundreds of thousands. | High | Medium | Use a dedicated search index (e.g., Elasticsearch/OpenSearch), caching of common queries, and horizontal scaling of search infrastructure. |

| Technical | Media (image/video) storage and delivery costs growing faster than revenue. | Medium | Medium | Enforce upload limits, auto-compress media, and use a CDN with tiered storage for aging content. |

| Legal/Compliance | Non-compliance with the Nigeria Data Protection Act (NDPA) 2023 in handling user and document data. | High | Low | Engage legal counsel for a data protection impact assessment; implement consent capture, data minimisation, and a designated Data Protection Officer. |

| Legal/Compliance | Disputes arising from inaccurate landlord ownership claims leading to platform liability exposure. | High | Medium | Clear Terms of Service disclaiming HouseOne as a marketplace facilitator, mandatory ownership document checks, and an indemnity clause for listing owners. |

| Security | Account takeover or credential-stuffing attacks against user accounts. | High | Medium | Enforce MFA for admin/agent roles, rate-limit login attempts, and monitor for anomalous login patterns. |

| Security | Fraudulent listings used as a vector for phishing or advance-fee scams targeting renters. | High | High | Verification badge system, in-app masked communication, user reporting, and proactive fraud-pattern monitoring by Moderators. |

--- TABLE END ---


14. Success Metrics (KPIs)

The following key performance indicators will be used to evaluate HouseOne's performance against its business objectives post-launch.


--- TABLE START ---

| Metric | Target | Primary Owner |

| Monthly Active Users (MAU) | Growth of 15% month-on-month in Year 1 | Product/Marketing |

| Number of Verified Properties | 70% of all Active listings Verified within 12 months of launch | Operations/Verification Team |

| Search-to-Enquiry Conversion Rate | ≥ 8% of searches result in an enquiry | Product |

| Enquiry-to-Rental Conversion Rate | ≥ 20% of accepted enquiries result in a confirmed rental | Product |

| Customer Satisfaction (CSAT) | ≥ 4.2 / 5 average post-interaction rating | Customer Support |

| Net Promoter Score (NPS) | ≥ 40 within 18 months | Product/Executive Management |

| Average Listing Verification Time | ≤ 5 business days from document submission to decision | Verification Team |

| Platform Uptime | ≥ 99.9% monthly uptime | DevOps/Engineering |

| Monthly Recurring Revenue (MRR) | Defined growth targets per fiscal-year business plan | Finance |

| Average Response Time to Enquiries | ≤ 4 hours during business hours | Landlords/Agents (platform-facilitated) |

--- TABLE END ---


15. Glossary & Appendix

15.1 Glossary of Terms


--- TABLE START ---

| Term | Definition |

| Verified Listing | A property listing that has completed document review, inspection, and final Admin approval. |

| Caution Fee | A refundable security deposit collected by the landlord/agent at the start of a tenancy, common in the Nigerian market. |

| Agency Fee | A fee (typically a percentage of annual rent) charged by an estate agent for facilitating a rental transaction. |

| LGA | Local Government Area — an administrative subdivision used in Nigeria, below the State level, for location categorisation. |

| Self-Con | Short for 'self-contained apartment' — a single-room unit with a private bathroom/kitchenette, common in the Nigerian rental market. |

| Short-Let | A furnished property rented for short durations (days to months), distinct from standard annual tenancies. |

| MoSCoW | Prioritisation technique classifying requirements as Must have, Should have, Could have, or Won't have (this iteration). |

| RBAC | Role-Based Access Control — a permission model that grants system access based on assigned user roles. |

| NDPA | Nigeria Data Protection Act (2023) — the principal statute governing personal data processing in Nigeria. |

| SLA | Service Level Agreement — a defined, measurable commitment for response or resolution time. |

--- TABLE END ---


15.2 Recommendations for Next Steps

Commission a detailed Solution Design Document (SDD) and data model based on this BRD prior to development sprint planning.

Conduct a formal Data Protection Impact Assessment (DPIA) with Legal & Compliance before handling identity/ownership documents at scale.

Pilot the verification workflow in core Eastern hubs (Enugu Coal City and Onitsha) to calibrate inspection SLAs and staffing before full Eastern regional rollout.

Validate subscription pricing tiers with a sample of agents/property managers ahead of general availability.

Establish the Customer Support SLA framework and staffing plan ahead of public launch to protect CSAT and NPS targets.