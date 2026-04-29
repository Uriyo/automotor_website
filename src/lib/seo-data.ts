export interface SEOPageData {
  h1: string;
  partName: string;
  vehicleName: string;
  cityName?: string;
  year?: string;
  make?: string;
  model?: string;
  priceLow: number;
  priceAvg: number;
  priceHigh: number;
  transactionCount: number;
  displacement: string;
  horsepower: string;
  torque: string;
  cylinders: string;
  fitmentNote: string;
  commonFailures: string[];
  inspectionTips: string[];
  redFlags: string[];
  laborHours: string;
  laborCostRange: string;
  faqs: Array<{ q: string; a: string }>;
  relatedVehicles: string[];
  relatedCities: string[];
  yards?: Array<{ name: string; rating: number; specialty: string; distance: string }>;
}

export const seoPages: Record<string, SEOPageData> = {
  "2014-chevrolet-silverado-1500": {
    h1: "Used 5.3L Engine for 2014 Chevrolet Silverado 1500",
    partName: "5.3L Engine",
    vehicleName: "2014 Chevrolet Silverado 1500",
    year: "2014",
    make: "Chevrolet",
    model: "Silverado 1500",
    priceLow: 1400,
    priceAvg: 1850,
    priceHigh: 2600,
    transactionCount: 147,
    displacement: "5.3L (323 cu in)",
    horsepower: "355 hp @ 5,600 rpm",
    torque: "383 lb-ft @ 4,100 rpm",
    cylinders: "V8, OHV",
    fitmentNote: "Also fits 2013–2016 Silverado 1500, Sierra 1500, Tahoe, Yukon (5.3L AFM variants)",
    commonFailures: [
      "AFM (Active Fuel Management) lifter failure — extremely common in 2007-2015 5.3L engines. Look for tick at cold start that intensifies under load.",
      "Oil consumption issues related to AFM system — check for excessive oil burning at highway speeds.",
      "Timing chain wear — most common after 120,000 miles. Listen for rattle on cold start.",
    ],
    inspectionTips: [
      "Request a compression test on all 8 cylinders before buying — should read 150+ PSI with no more than 15% variance.",
      "Check the VIN against the donor vehicle — confirm it's from a Silverado or compatible platform, not a heavy-duty truck.",
      "Ask specifically about AFM delete — engines with AFM deleted sell at a premium but will outlast unmodified units.",
    ],
    redFlags: [
      "No compression test documentation — any reputable yard will provide this on used engines over $1,000.",
      "Mileage over 120,000 on a non-tested unit — that's gambling on timing chain and AFM condition.",
      "Suspiciously low price ($800 or less) — likely untested, could have hidden damage or incorrect fitment.",
    ],
    laborHours: "8-12 hours",
    laborCostRange: "$1,200–$1,800 nationally",
    faqs: [
      { q: "How much does a used 5.3 engine cost?", a: "Based on 147 real transactions in the last 90 days, prices range from $1,400 (high-mileage as-is) to $2,600 (low-mileage tested). The average is $1,850 for a tested engine with 90-day warranty. Expect to pay a $200–400 premium for an AFM-deleted unit." },
      { q: "How do I know if a used engine will fit?", a: "The 5.3L fits all 2007–2014 Silverado/Sierra 1500 and 2007–2014 Tahoe/Yukon. Key fitment factors: the flexplate/flywheel is specific to your transmission (4L60E vs 6L80E), and the oil pan shape varies between truck and SUV platforms. Our AI verifies fitment by VIN." },
      { q: "What warranty do used engines come with?", a: "Most reputable yards offer 30–90 day warranties on tested engines. Our partner yards offer a minimum 90-day fitment guarantee, backed by our escrow system. If it doesn't fit or fails within 90 days, you get a full refund." },
      { q: "Can I install it myself?", a: "A 5.3 swap in a Silverado is doable for experienced DIYers — you'll need an engine hoist, proper torque specs, and about 10-14 hours on a first swap. Most choose professional installation given the labor cost relative to risk of something going wrong." },
      { q: "How long does shipping take?", a: "Yards in Texas typically ship within 48 hours of payment. Freight shipping to most of the continental US takes 2-5 business days. Local pickup is always available and saves the $150–300 freight cost." },
      { q: "What's the difference between a long block and short block?", a: "A long block includes the complete engine assembly — heads, intake, valvetrain, timing chain. A short block is just the block and rotating assembly. For most swaps, a long block is the right choice as it minimizes labor and parts." },
      { q: "Is the 5.3 reliable?", a: "The GM 5.3L is one of the most reliable V8 truck engines ever made — millions of units, parts everywhere, shops know them cold. The main weakness is the AFM system. Engines with AFM deleted or with updated range selectors routinely go 200,000+ miles." },
      { q: "What tools do I need for the swap?", a: "Engine hoist and stand, 3/8\" and 1/2\" drive socket sets, torque wrench, harmonic balancer puller, intake manifold gaskets, exhaust gaskets, and all new motor mount hardware. Budget $200-400 for fluids, gaskets, and hardware." },
    ],
    relatedVehicles: [
      "Used 5.3L engines for 2013 Silverado 1500",
      "Used 5.3L engines for 2015 Silverado 1500",
      "Used 5.3L engines for 2014 Sierra 1500",
      "Used 5.3L engines for 2014 Tahoe",
      "Used transmissions for 2014 Silverado 1500",
    ],
    relatedCities: [
      "Used engines in Houston TX",
      "Used engines in San Antonio TX",
      "Used engines in Austin TX",
      "Used engines in Oklahoma City OK",
    ],
  },
  "ford-f150": {
    h1: "Used Transmission for Ford F-150",
    partName: "Transmission",
    vehicleName: "Ford F-150",
    priceLow: 800,
    priceAvg: 1400,
    priceHigh: 2200,
    transactionCount: 203,
    displacement: "10R80 (10-speed) / 6R80 (6-speed)",
    horsepower: "N/A",
    torque: "N/A",
    cylinders: "N/A",
    fitmentNote: "6R80 fits 2011–2017 F-150 with 5.0L or 3.5L EcoBoost. 10R80 fits 2017+ F-150 with EcoBoost or 5.0L.",
    commonFailures: [
      "10R80 harsh shifting and shudder on the 2017–2019 model years — Ford extended warranty coverage for this issue.",
      "6R80 torque converter failure causing shudder — common with high-mileage towing trucks.",
      "Valve body solenoid wear causing delayed engagement — diagnosed by shift flare under light acceleration.",
    ],
    inspectionTips: [
      "Verify the transmission generation (6R80 vs 10R80) by year and engine before ordering.",
      "Request fluid pull history — clean fluid means the unit was maintained; black or burnt fluid is a red flag.",
      "Ask about test drive footage — reputable yards will drive the donor vehicle and test shift quality.",
    ],
    redFlags: [
      "No test drive documentation on a unit over $1,200.",
      "Units listed with stripped VINs — you can't verify the donor vehicle's history.",
      "No mention of torque converter condition — it's the most common failure point and often sold separately.",
    ],
    laborHours: "6-8 hours",
    laborCostRange: "$800–$1,400",
    faqs: [
      { q: "How much does a used F-150 transmission cost?", a: "Based on 203 recent transactions, prices range from $800 (high-mileage 6R80) to $2,200 (low-mileage 10R80 with converter). Average is $1,400 for a tested unit. 10R80s command a 30-40% premium over 6R80s due to scarcity." },
      { q: "6R80 vs 10R80 — which do I need?", a: "The 6R80 was used in 2011–2017 F-150s. The 10R80 was introduced in 2017 and is used in all current F-150s. They are NOT interchangeable — your truck's year and build date determine which you need. Our AI verifies by VIN automatically." },
      { q: "Will a used transmission last?", a: "A properly tested used F-150 transmission with verified low mileage and clean fluid history typically lasts 80,000–120,000 miles. With a fresh fluid service and new filter on installation, you can often double that." },
      { q: "What's included in a transmission swap?", a: "The transmission, torque converter (verify this!), and in some cases the transmission control module. You'll need new transmission fluid (about 14 quarts for a full fill), a new filter, a pan gasket, and new crossmember hardware." },
      { q: "Can I tow after installing a used transmission?", a: "Yes, but break it in first — no heavy towing for the first 500 miles. After that, ensure you have a transmission cooler installed, especially if you tow regularly. This extends life significantly." },
    ],
    relatedVehicles: [
      "Used engines for Ford F-150",
      "Used transmissions for 2015 F-150",
      "Used transmissions for 2018 F-150",
      "Used transmissions for Ford F-250",
    ],
    relatedCities: [
      "Used transmissions in Dallas TX",
      "Used transmissions in Houston TX",
      "Used transmissions in Phoenix AZ",
    ],
  },
  "dallas-tx": {
    h1: "Used Engines in Dallas, TX",
    partName: "Engine",
    vehicleName: "All vehicles",
    cityName: "Dallas, TX",
    priceLow: 1200,
    priceAvg: 1900,
    priceHigh: 3400,
    transactionCount: 892,
    displacement: "Various",
    horsepower: "Various",
    torque: "Various",
    cylinders: "Various",
    fitmentNote: "Dallas-area yards ship to all 50 states. Average shipping time: 2-4 days.",
    commonFailures: [],
    inspectionTips: [],
    redFlags: [],
    laborHours: "Varies by engine",
    laborCostRange: "$1,400–$2,000 in Dallas",
    faqs: [
      { q: "How many junkyards are in Dallas?", a: "The Dallas-Fort Worth metro has over 40 active salvage yards ranging from massive LKQ operations to independent specialty yards. AutoMotor partners with 28 yards in the DFW area." },
      { q: "Can I pick up locally?", a: "Absolutely. All 28 of our Dallas-area partner yards offer local pickup. You can reserve online and pick up same-day or next day in most cases. Some yards require 24-hour notice to pull the part." },
      { q: "What's the average shipping time from Dallas?", a: "Parts shipped from Dallas typically arrive in 2-4 business days for most of Texas and surrounding states. East Coast delivery takes 4-6 days via freight. Expedited options are available for an additional fee." },
      { q: "Which Dallas yards specialize in trucks?", a: "Tommy's Auto Salvage (Irving) and Pick-n-Pull Dallas (Garland) are our highest-rated truck specialists in the area. Both stock heavy inventory of F-150, Silverado, and Ram powertrains." },
    ],
    relatedVehicles: [
      "Used 5.3L engines for Silverado 1500",
      "Used 5.0L engines for F-150",
      "Used Cummins engines for Ram 2500",
      "Used EcoBoost engines for F-150",
    ],
    relatedCities: [
      "Used engines in Houston TX",
      "Used engines in San Antonio TX",
      "Used engines in Fort Worth TX",
      "Used engines in Oklahoma City OK",
    ],
    yards: [
      { name: "Tommy's Auto Salvage", rating: 4.8, specialty: "GM / Chevy", distance: "Irving · 23 mi from downtown" },
      { name: "Pick-n-Pull Dallas", rating: 4.5, specialty: "All makes", distance: "Garland · 18 mi from downtown" },
      { name: "LKQ DFW", rating: 4.7, specialty: "All makes", distance: "Garland · 22 mi from downtown" },
      { name: "North Texas Auto Parts", rating: 4.6, specialty: "Domestic trucks", distance: "McKinney · 35 mi from downtown" },
      { name: "Texas Diesel Parts", rating: 4.9, specialty: "Diesel / Cummins", distance: "Mesquite · 15 mi from downtown" },
    ],
  },
};
