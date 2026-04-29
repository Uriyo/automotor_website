Now build the My Garage page at the route /garage.

Purpose: users save their vehicles so the AI has context in every future chat, and they can receive alerts when rare parts hit the inventory.

Page header:
- Large headline in Space Grotesk: "🚗 My Garage."
- Subhead: "Save your vehicles. We'll hunt for rare parts. Text you when prices drop."

Vehicle cards (grid of 3 columns desktop, 1 column mobile):
- Each card is a dark rounded-2xl panel.
- Top row: year + make + model in bold (e.g., "2014 Silverado 1500"). Below: "5.3L V8 · 4WD" in muted gray.
- Middle: VIN in monospace font, truncated with a copy icon.
- Divider.
- Stats block: "📊 This month: 3 parts tracked. Avg price dropping 4%."
- Toggle row: "🔔 Price alerts · SMS" with an orange toggle switch (default on).
- Toggle row: "🔔 Rare part alerts · SMS" with another toggle (default on).
- Bottom two buttons: outlined "View history" and filled orange "New conversation."

Seed the page with 2 mock vehicle cards:
- 2014 Chevrolet Silverado 1500 · 5.3L V8.
- 2019 Ford F-150 · 3.5L EcoBoost.

Add vehicle card (4th card, looks different):
- Dashed orange border, centered content.
- Big + icon in orange.
- Text: "Add a vehicle."
- Tapping opens an Add Vehicle modal.

Add Vehicle modal:
- Large dark modal, rounded-2xl, max-width 560px.
- Three tabs at the top: "VIN," "License Plate," "Manual."
- VIN tab (default): big uppercase input for 17-character VIN, auto-uppercases as user types, validates length. Button: "Decode VIN." After decode (simulate with a loading spinner then fake data), show a confirmation card with decoded year/make/model/engine and a "Save to garage" button.
- License Plate tab: state dropdown + plate number input + "Look up vehicle."
- Manual tab: year dropdown, make dropdown, model dropdown, trim dropdown, engine dropdown.
- Bottom of modal: "Cancel" and "Save vehicle."

Empty state (for brand-new users with no vehicles):
- Large centered illustration of a car silhouette in orange outline.
- Headline: "Your garage is empty."
- Subtext: "Add your first vehicle so our AI remembers it across every chat."
- Big orange button: "+ Add your first vehicle."

Mobile responsiveness:
- Cards stack full width.
- Add Vehicle modal becomes a bottom sheet on mobile.
- All inputs are full width with large tap targets.

Do not build supplier pages or admin yet.