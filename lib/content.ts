// ============================================
// EAGLE AUTOMATION - CONTENT DATA
// CMS-ready structure - edit content here
// ============================================

export interface MediaItem {
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string;
  width?: number;
  height?: number;
}

export const siteMedia = {
  hero: [
    { src: "/images/hero-machines.png", alt: "CNC machines and FANUC robots — turnkey automation cells", type: "image" as const, width: 900, height: 580 },
  ] as MediaItem[],
  process: [
    { src: "/images/applications/crx-20ia-machine-tending.png", alt: "FANUC CRX-20iA/L tending a CNC machine", type: "image" as const },
    { src: "/images/applications/crx-cnc-tending-cell.png", alt: "FANUC CRX cobot with CNC automation cell", type: "image" as const },
  ] as MediaItem[],
  about: [
    { src: "/images/applications/crx-30ia-machine-tending.png", alt: "FANUC CRX-30iA tending a FANUC Robodrill", type: "image" as const },
    { src: "/images/applications/crx-20ia-l-robodrill.png", alt: "FANUC CRX-20iA/L machine tending a Robodrill Plus", type: "image" as const },
  ] as MediaItem[],
  platform: [
    { src: "/images/robots/crx-family-lineup.png", alt: "Full FANUC CRX collaborative robot lineup", type: "image" as const },
    { src: "/images/applications/crx-cnc-tending-cell.png", alt: "FANUC CRX cobot with CNC automation cell", type: "image" as const },
  ] as MediaItem[],
};

export const siteConfig = {
  name: "Eagle Automation",
  tagline: "Turnkey CNC Automation. ROI-Driven Integration.",
  description:
    "Eagle Automation delivers turnkey CNC automation cells powered by FANUC robotics. We help manufacturers reduce labor exposure, increase spindle utilization, and achieve lights-out production with predictable ROI.",
  url: "https://eagleautomation.com",
  contact: {
    phone: "(817) 472-5178",
    email: "sales@eaglemachine.net",
    address: "1009 Commercial Blvd. North, Arlington, TX 76001",
  },
  social: {
    linkedin: "https://linkedin.com/company/eagle-machine",
  },
};

export const navigation = {
  main: [
    { name: "Solutions", href: "/solutions" },
    { name: "Platform", href: "/platform" },
    { name: "ROI & Resources", href: "/roi" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Process", href: "/process" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Eagle Machine", href: "https://eaglemachine.net", external: true },
  ] as { name: string; href: string; external?: boolean }[],
  footer: {
    solutions: [
      { name: "CNC Tending", href: "/solutions#cnc-tending" },
      { name: "Palletizing", href: "/solutions#palletizing" },
      { name: "Machine Loading", href: "/solutions#machine-loading" },
      { name: "Part Transfer", href: "/solutions#part-transfer" },
      { name: "Deburr / Assembly", href: "/solutions#deburr-assembly" },
    ],
    resources: [
      { name: "ROI Calculator", href: "/roi#calculator" },
      { name: "ROI Deck", href: "/roi#deck" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Process Overview", href: "/process" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Eagle Machine", href: "https://eaglemachine.net", external: true },
    ],
  },
};

export const heroContent = {
  kicker: "FANUC Robotics | Turnkey Integration",
  headline: "Turnkey CNC Automation.",
  headlineAccent: "ROI-Driven Integration.",
  subheadline:
    "Replace labor exposure with fixed capital. Increase spindle utilization. Achieve lights-out production with predictable payback under 12 months.",
  ctas: {
    primary: { label: "Automate Your Process", href: "/contact" },
    secondary: { label: "See How It Works", href: "/roi" },
  },
  stats: [
    { value: "<12", unit: "mo", label: "Payback Period", variant: "default" as const },
    { value: "$209K", unit: "+", label: "3-Year Savings", variant: "money" as const },
    { value: "24/7", unit: "", label: "Lights-Out Capable", variant: "default" as const },
  ],
};

export const outcomesContent = {
  headline: "Operational Efficiency & Labor Displacement",
  items: [
    {
      title: "Replace 1 Operator",
      description: "Direct labor cost reduction immediately upon deployment.",
      metric: "$44K",
      metricLabel: "Annual labor per shift",
      variant: "money" as const,
    },
    {
      title: "Increase Spindle Utilization",
      description:
        "Eliminate idle time during breaks, shift changes, and operator fatigue.",
      metric: "85%+",
      metricLabel: "Utilization target",
      variant: "default" as const,
    },
    {
      title: "Run 24/7",
      description:
        "Unattended overnight production capabilities (lights-out manufacturing).",
      metric: "3x",
      metricLabel: "Shift coverage potential",
      variant: "default" as const,
    },
    {
      title: "Stabilize Production",
      description: "Consistent cycle times and predictable output every shift.",
      metric: "±0.5%",
      metricLabel: "Output variance",
      variant: "default" as const,
    },
  ],
};

export const industriesContent = {
  headline: "Industries We Serve",
  subheadline:
    "Precision automation for manufacturers who cannot compromise on quality or throughput.",
  items: [
    {
      name: "Firearms",
      description:
        "High-precision components with strict tolerances. Consistent finish quality across high volumes.",
    },
    {
      name: "Aerospace & Defense",
      description:
        "Complex geometries and exotic materials. Full traceability and documentation support.",
    },
    {
      name: "Job Shops",
      description:
        "Flexible cells for mixed parts. Quick changeover and programming support.",
    },
    {
      name: "General Manufacturing",
      description:
        "High-volume production with predictable labor costs. Scalable automation architecture.",
    },
  ],
};

export const capabilitiesContent = {
  headline: "Capabilities",
  items: [
    {
      title: "CNC Tending",
      description:
        "Automated load/unload cycles for lathes and mills. Door actuation, part orientation, and chip management integration.",
      href: "/solutions#cnc-tending",
    },
    {
      title: "Palletizing",
      description:
        "Organized part stacking for downstream processing or shipping. Custom fixtures and stackers.",
      href: "/solutions#palletizing",
    },
    {
      title: "Machine Loading/Unloading",
      description:
        "Interface with any CNC control. Seamless handoff between robot and machine.",
      href: "/solutions#machine-loading",
    },
    {
      title: "Part Transfer & Door Handling",
      description:
        "Multi-machine cells with automated part routing. Integrated safety systems.",
      href: "/solutions#part-transfer",
    },
    {
      title: "Deburr / Light Assembly",
      description:
        "Force-controlled deburring and repetitive assembly tasks. Consistent quality, reduced ergonomic risk.",
      href: "/solutions#deburr-assembly",
    },
  ],
};

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Initial call to understand your process, volume, and constraints. No commitment required.",
  },
  {
    number: "02",
    title: "Scope",
    description:
      "On-site assessment or virtual review of your cell layout, cycle times, and part characteristics.",
  },
  {
    number: "03",
    title: "Proposal",
    description:
      "Detailed ROI analysis with equipment specification, layout, and investment breakdown.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Cell integration at our facility with your approval at key milestones.",
  },
  {
    number: "05",
    title: "Install",
    description:
      "On-site installation, commissioning, and safety validation.",
  },
  {
    number: "06",
    title: "Support",
    description:
      "Comprehensive training, documentation, and ongoing technical support.",
  },
];

export const pdfAssets = [
  {
    id: "roi-deck",
    title: "ROI Analysis Deck",
    description:
      "Complete 6-page financial analysis showing payback timeline, labor displacement, cash flow roadmap, and 3-year savings projection for CNC automation.",
    filename: "eagle-automation-roi-pitch.pdf",
    thumbnail: "/images/pdf-previews/roi-pitch-preview.png",
    category: "Financial",
  },
  {
    id: "executive-summary",
    title: "Executive Summary",
    description:
      "One-page strategic financial assessment — investment breakdown, 5-year labor cost projection, and cumulative savings at a glance.",
    filename: "eagle-automation-executive-summary.pdf",
    thumbnail: "/images/pdf-previews/executive-summary-preview.png",
    category: "Financial",
  },
  {
    id: "company-overview",
    title: "Eagle Automation Solutions 2026",
    description:
      "Comprehensive overview of our integration services, strategic advantages, discovery process, and how to get started with your automation project.",
    filename: "eagle-automation-solutions-2026.pdf",
    thumbnail: "/images/pdf-previews/solutions-2026-preview.png",
    category: "Overview",
  },
];

export const solutions = [
  {
    id: "cnc-tending",
    title: "CNC Tending",
    headline: "Automated Machine Tending for Lathes and Mills",
    description:
      "Remove the operator from repetitive load/unload cycles. Our CNC tending cells handle part placement, door actuation, and cycle initiation while maintaining the precision your process demands.",
    whoItsFor: [
      "High-volume turning operations",
      "Milling cells with predictable cycle times",
      "Operations running multiple shifts",
      "Shops with labor recruitment challenges",
    ],
    typicalLayout:
      "Single robot serving 1-2 machines with infeed/outfeed conveyors or part presenters. Safety fencing or collaborative zone configuration based on cycle time requirements.",
    requiredInputs: [
      { label: "Part Weight", example: "Up to 25 kg depending on model" },
      { label: "Cycle Time", example: "> 45 seconds recommended" },
      { label: "Machine Interface", example: "FANUC, Siemens, or other CNC controls" },
      { label: "Part Geometry", example: "Grippable features required" },
    ],
    safetyNote:
      "FANUC collaborative robots enable fenceless operation for appropriate applications. Safety assessment included in every proposal.",
    relatedPdfs: ["roi-deck", "company-overview"],
    layoutComponents: ["Robot", "CNC Machine 1", "CNC Machine 2", "Infeed Conveyor", "Outfeed Conveyor", "Safety Zone"],
    media: [
      { src: "/images/applications/crx-cnc-tending-cell.png", alt: "FANUC CRX cobot in a CNC tending cell", type: "image" as const },
      { src: "/images/applications/crx-20ia-machine-tending.png", alt: "FANUC CRX-20iA/L tending a CNC machine", type: "image" as const },
      { src: "/images/applications/crx-20ia-l-robodrill.png", alt: "CRX-20iA/L tending a FANUC Robodrill Plus", type: "image" as const },
    ] as MediaItem[],
  },
  {
    id: "palletizing",
    title: "Palletizing",
    headline: "Organized Part Handling for Downstream Efficiency",
    description:
      "Finished parts stacked precisely for heat treat, coating, assembly, or shipping. Custom fixtures ensure part protection and optimize pack density.",
    whoItsFor: [
      "Operations feeding secondary processes",
      "Shipping-ready part staging",
      "Clean room or controlled environments",
      "High-mix part families with similar footprints",
    ],
    typicalLayout:
      "Robot positioned between machine output and pallet stations. Dual-pallet configuration allows continuous operation during pallet changes.",
    requiredInputs: [
      { label: "Part Dimensions", example: "Length, width, height" },
      { label: "Stack Pattern", example: "Grid, nested, or custom" },
      { label: "Pallet Size", example: "Standard or custom" },
      { label: "Parts per Pallet", example: "Target quantity" },
    ],
    safetyNote:
      "Light curtains or area scanners maintain productivity while ensuring operator safety during pallet exchange.",
    relatedPdfs: ["company-overview"],
    layoutComponents: ["Robot", "Machine Output", "Pallet Station A", "Pallet Station B", "Light Curtain"],
    media: [
      { src: "/images/applications/crx-10ia-kitting.png", alt: "FANUC CRX-10iA kitting and palletizing application", type: "image" as const },
      { src: "/images/applications/cr-35ib-material-handling.png", alt: "FANUC CR-35iB handling heavy metal castings", type: "image" as const },
    ] as MediaItem[],
  },
  {
    id: "machine-loading",
    title: "Machine Loading/Unloading",
    headline: "Seamless Material Flow Into and Out of Your Process",
    description:
      "From raw stock to finished part, automate the material handling that consumes operator time. Interface with any CNC control for coordinated operation.",
    whoItsFor: [
      "Bar-fed or blank-loaded machines",
      "Secondary operations requiring precise positioning",
      "Multi-machine cells",
      "Operations with heavy or awkward parts",
    ],
    typicalLayout:
      "Centralized robot with reach to multiple machines. Gravity or powered conveyors for infeed/outfeed staging.",
    requiredInputs: [
      { label: "Stock Type", example: "Bar, blank, casting" },
      { label: "Part Weight", example: "Loaded and finished" },
      { label: "Machine Count", example: "1-4 typical" },
      { label: "Control Type", example: "FANUC, Siemens, etc." },
    ],
    safetyNote:
      "Full risk assessment ensures proper guarding for payload and speed requirements.",
    relatedPdfs: ["roi-deck", "executive-summary"],
    layoutComponents: ["Robot", "Infeed Conveyor", "CNC Machine 1", "CNC Machine 2", "CNC Machine 3", "Outfeed Staging"],
    media: [
      { src: "/images/applications/crx-30ia-machine-tending.png", alt: "FANUC CRX-30iA machine tending a Robodrill", type: "image" as const },
      { src: "/images/applications/crx-20ia-l-robodrill.png", alt: "CRX-20iA/L loading parts into a Robodrill Plus", type: "image" as const },
    ] as MediaItem[],
  },
  {
    id: "part-transfer",
    title: "Part Transfer & Door Handling",
    headline: "Multi-Operation Routing with Automated Access",
    description:
      "Connect sequential operations with automated part transfer. Integrated door handling eliminates the slowest part of your cycle.",
    whoItsFor: [
      "Op 10 / Op 20 configurations",
      "Turn-mill operations",
      "In-process inspection stations",
      "Cells with multiple workholding setups",
    ],
    typicalLayout:
      "Single robot managing part flow between 2-4 stations. Intermediate staging for buffer and inspection.",
    requiredInputs: [
      { label: "Operation Sequence", example: "Process flow" },
      { label: "Transfer Time Budget", example: "Available window" },
      { label: "Door Type", example: "Sliding, swing, vertical" },
      { label: "Part Orientation", example: "Flip/rotate requirements" },
    ],
    safetyNote:
      "Door interlocks and machine status monitoring ensure safe coordination between robot and equipment.",
    relatedPdfs: ["company-overview"],
    layoutComponents: ["Robot", "Op 10 Machine", "Op 20 Machine", "Staging Buffer", "Door Actuator", "Safety Interlock"],
    media: [
      { src: "/images/applications/crx-10ia-l-inspection.png", alt: "FANUC CRX-10iA/L battery inspection and part transfer", type: "image" as const },
      { src: "/images/applications/crx-20ia-machine-tending.png", alt: "FANUC CRX-20iA/L next to CNC with door handling", type: "image" as const },
    ] as MediaItem[],
  },
  {
    id: "deburr-assembly",
    title: "Deburr / Light Assembly",
    headline: "Automated Deburring and Light Assembly Operations",
    description:
      "Remove manual deburring bottlenecks and repetitive assembly tasks. Consistent force control and path accuracy eliminate quality variation while freeing skilled operators for higher-value work.",
    whoItsFor: [
      "Parts requiring consistent edge breaks or chamfers",
      "High-volume deburring after machining operations",
      "Repetitive assembly or fastening tasks",
      "Operations where manual deburring creates ergonomic risk",
    ],
    typicalLayout:
      "Robot with force-controlled deburring spindle or compliant tool. Parts presented via conveyor, tray, or direct machine output. Dust collection integrated as needed.",
    requiredInputs: [
      { label: "Part Geometry", example: "Edge profiles and surface requirements" },
      { label: "Material", example: "Aluminum, steel, titanium, etc." },
      { label: "Cycle Time Target", example: "Seconds per part" },
      { label: "Finish Spec", example: "Edge break size, Ra requirements" },
    ],
    safetyNote:
      "Force-sensing tools and enclosed work zones ensure operator safety. Dust and chip management integrated into cell design.",
    relatedPdfs: ["company-overview"],
    layoutComponents: ["Robot", "Deburring Spindle", "Part Presenter", "Dust Collection", "Inspection Station"],
    media: [
      { src: "/images/applications/crx-10ia-sanding.png", alt: "FANUC CRX-10iA sanding and surface finishing", type: "image" as const },
      { src: "/images/applications/crx-20ia-l-dispensing.png", alt: "FANUC CRX-20iA/L dispensing application", type: "image" as const },
      { src: "/images/applications/crx-5ia-gear-assembly.png", alt: "FANUC CRX-5iA gear assembly cell", type: "image" as const },
    ] as MediaItem[],
  },
];

export const platformContent = {
  headline: "FANUC Robot Platforms",
  subheadline:
    "We select the right FANUC robot for your application. From collaborative CRX models for fenceless operation to industrial series for high-speed, high-payload demands—matched to your process.",
  robots: [
    {
      model: "CRX-5iA",
      payload: "5 kg",
      reach: "994 mm",
      axes: 6,
      weight: "25 kg",
      image: "/images/robots/cut/crx-5ia.png",
      description: "Made for working safely and efficiently alongside human staff. Perfect for manufacturers with little-to-no experience in robotics, especially in material handling, machine tending, and picking/packaging. Features FANUC\u2019s drag-and-drop touchscreen programming interface.",
      bestFor: "Compact cells, light parts, and tight floor space. Ideal for small lathes and bench-top applications.",
      highlights: ["8 Years Zero Maintenance", "Drag-and-drop programming", "Food-grade model available"],
      collaborative: true,
    },
    {
      model: "CRX-10iA",
      payload: "10 kg",
      reach: "1,249 mm",
      axes: 6,
      weight: "40 kg",
      image: "/images/robots/cut/crx-10ia.png",
      description: "A great option for manufacturers new to robotics. Offers an all-new FANUC programming interface with simple drag-and-drop technology on a touchscreen teach pendant. Ease of programming paired with world-renowned reliability and sensitive contact detection allows it to work safely alongside people.",
      bestFor: "Most CNC tending applications under 22 lbs. Our most common deployment for single-machine cells.",
      highlights: ["8 Years Zero Maintenance", "Sensitive contact detection", "Food-grade model available"],
      collaborative: true,
    },
    {
      model: "CRX-10iA/L",
      payload: "10 kg",
      reach: "1,418 mm",
      axes: 6,
      weight: "40 kg",
      image: "/images/robots/cut/crx-10ia-l.png",
      description: "An ideal industrial robot for manufacturers with little to no robotics experience. The slightly longer reach than the CRX-10iA and unique underflip motion allow it to perform dynamic movements efficiently, even in relatively confined spaces. Also available as a painting cobot.",
      bestFor: "Extended reach for larger machines or multi-station cells. Dynamic movements in confined spaces.",
      highlights: ["8 Years Zero Maintenance", "Unique underflip motion", "Paint variant available"],
      collaborative: true,
    },
    {
      model: "CRX-20iA/L",
      payload: "20 kg",
      reach: "1,418 mm",
      axes: 6,
      weight: "41 kg",
      image: "/images/robots/cut/crx-20ia-l.png",
      description: "Features a 20 kg payload and 1,418 mm reach with an under-flip motion. Ideal for applications requiring a higher payload in a small footprint\u2014perfect for tight spaces and movements that would be awkward for similar cobots on the market.",
      bestFor: "Heavier parts or dual-part gripping in tight footprints. Palletizing, welding, machine tending, inspection, and material removal.",
      highlights: ["8 Years Zero Maintenance", "Under-flip motion", "Small installation footprint"],
      collaborative: true,
    },
    {
      model: "CRX-30iA",
      payload: "25/30 kg",
      reach: "1,756 mm",
      axes: 6,
      weight: "135 kg",
      image: "/images/robots/cut/crx-30ia.png",
      description: "One of the heavier lifters of the FANUC CRX series. The first FANUC cobot to feature standard wrist button functionality on the J6 flange\u2014directly teach the robot new movements using customizable buttons right on its wrist for total control and flexibility.",
      bestFor: "Palletizing, material handling, machine tending, welding, and heavy-payload applications requiring collaborative safety.",
      highlights: ["Wrist button teaching", "25\u201330 kg capacity", "Largest CRX reach"],
      collaborative: true,
    },
    {
      model: "CR-35iB",
      payload: "50 kg",
      reach: "1,643 mm",
      axes: 6,
      weight: "375 kg",
      image: "/images/robots/cut/cr-35ib.png",
      description: "The industry\u2019s strongest collaborative robot, capable of working alongside operators in applications that typically require lift-assist devices or custom equipment. Large work envelope with a small installation footprint. Integrates FANUC\u2019s newest safety sensor technology while retaining simple CRX-style programming.",
      bestFor: "Max-payload collaborative applications. Heavy part handling that replaces lift-assist devices or custom equipment.",
      highlights: ["50 kg payload", "FANUC safety sensor tech", "CRX-style programming"],
      collaborative: true,
    },
  ],
  industrialNote: "We also deploy FANUC's full industrial robot lineup for high-speed, high-payload, and specialized applications where collaborative features aren't required. Contact us to discuss which platform fits your process.",
  eoatOptions: [
    {
      category: "Pneumatic Grippers",
      description:
        "Standard 2-jaw and 3-jaw options for most cylindrical and prismatic parts.",
    },
    {
      category: "Electric Grippers",
      description:
        "Servo-controlled grip force for delicate parts or variable geometry.",
    },
    {
      category: "Custom Fixtures",
      description:
        "Application-specific designs for unique part families or multi-part gripping.",
    },
    {
      category: "Tool Changers",
      description: "Automatic EOAT exchange for high-mix cells.",
    },
  ],
  integrationApproach: {
    headline: "CNC Integration",
    points: [
      "Native FANUC robot-to-CNC communication for seamless coordination",
      "M-code and macro integration with FANUC, Siemens, and other controls",
      "Door actuation interface (pneumatic or servo)",
      "Part-present sensing and confirmation",
      "Cycle complete handshaking",
    ],
  },
};

export const caseStudies = [
  {
    id: "firearms-manufacturer",
    title: "Firearms Component Manufacturer",
    industry: "Firearms",
    challenge:
      "Manual loading of lathe for high-volume receiver production. Single shift limited by labor availability. Quality variance during shift transitions.",
    approach:
      "FANUC CRX cell with dual-spindle interface. Custom gripper for multiple part numbers. Integrated parts counter and reject bin.",
    outcomes: [
      { metric: "2.5x", label: "Shift coverage (1 to 2.5 shifts)", variant: "default" as const },
      { metric: "<11 mo", label: "Payback period", variant: "default" as const },
      { metric: "15%", label: "Scrap reduction", variant: "default" as const },
      { metric: "$92K", label: "Year 1 labor savings", variant: "money" as const },
    ],
    quote:
      "We went from struggling to staff second shift to running lights-out on weekends.",
    quoteAuthor: "Operations Manager",
    isExample: true,
    media: [
      { src: "/images/applications/crx-20ia-machine-tending.png", alt: "FANUC CRX cobot tending a CNC machine", type: "image" as const },
    ] as MediaItem[],
  },
  {
    id: "aerospace-job-shop",
    title: "Aerospace Job Shop",
    industry: "Aerospace & Defense",
    challenge:
      "High-mix environment with frequent changeovers. Skilled operators spending 40% of time on load/unload. Difficulty meeting delivery schedules.",
    approach:
      "Flexible FANUC CRX cell with quick-change grippers. Teach pendant programming for operator-led setup. Integration with existing Siemens control.",
    outcomes: [
      { metric: "40%", label: "Operator time recovered", variant: "default" as const },
      { metric: "12", label: "Part families automated", variant: "default" as const },
      { metric: "99.2%", label: "On-time delivery (up from 87%)", variant: "default" as const },
      { metric: "14 mo", label: "Payback period", variant: "default" as const },
    ],
    quote:
      "Our machinists now focus on programming and quality instead of standing at the machine.",
    quoteAuthor: "Shop Owner",
    isExample: true,
    media: [
      { src: "/images/applications/crx-30ia-machine-tending.png", alt: "FANUC CRX-30iA machine tending application", type: "image" as const },
    ] as MediaItem[],
  },
  {
    id: "medical-device",
    title: "Medical Device Producer",
    industry: "Medical",
    challenge:
      "Strict traceability requirements. Manual handling risking contamination. 24-hour demand with limited clean room staff.",
    approach:
      "FANUC robot cell in controlled environment. Vision-guided picking from trays. Automatic serial number logging.",
    outcomes: [
      { metric: "24/7", label: "Continuous operation", variant: "default" as const },
      { metric: "100%", label: "Part traceability", variant: "default" as const },
      { metric: "Zero", label: "Handling contamination events", variant: "default" as const },
      { metric: "18 mo", label: "Payback period", variant: "default" as const },
    ],
    quote: "The cell paid for itself and eliminated our biggest quality risk.",
    quoteAuthor: "Quality Director",
    isExample: true,
    media: [
      { src: "/images/applications/crx-lab-application.png", alt: "FANUC CRX cobot in a controlled lab environment", type: "image" as const },
    ] as MediaItem[],
  },
];

export const processContent = {
  discovery: {
    headline: "Discovery Call",
    description:
      "A 30-minute conversation to understand your process, pain points, and goals. No commitment, no pressure. The more details you provide upfront, the more accurate our ROI analysis and system proposal will be.",
    whatWeDiscuss: [
      "Machine OEM, model number, lathe or mill configuration",
      "Auto-door availability and Ethernet/IP robot interface",
      "Part material, weight, dimensions, and number of part types",
      "Current machine cycle time and target parts per hour",
      "Minimum unattended runtime and shift schedule requirements",
      "Floor space constraints and safety fencing requirements",
    ],
    prepareItems: [
      "2D Drawings",
      "3D STEP Files",
      "Process Video",
      "Cycle Times",
    ],
  },
  assessment: {
    headline: "On-Site Assessment",
    description:
      "Our engineers visit your facility to validate the automation concept and gather detailed requirements.",
    checklist: [
      "Machine measurements and reach study",
      "Part samples and fixture review",
      "Safety zone requirements",
      "Utilities (air, power, network)",
      "Floor space and workflow mapping",
      "In-feed/out-feed conveyor needs",
      "3D machine model availability",
    ],
  },
  timeline: {
    headline: "Integration Timeline",
    typical: "8-12 weeks from PO to production",
    phases: [
      { week: "1-2", activity: "Engineering and procurement" },
      { week: "3-6", activity: "Cell build and testing at Eagle facility" },
      { week: "7-8", activity: "Customer approval and modifications" },
      { week: "9-10", activity: "Installation and commissioning" },
      { week: "11-12", activity: "Training and production ramp" },
    ],
  },
  training: {
    headline: "Training Included",
    description:
      "Every cell includes comprehensive training to ensure your team is self-sufficient.",
    includes: [
      "Robot programming fundamentals",
      "Cell operation and daily startup",
      "Basic troubleshooting",
      "Program modification for new parts",
      "Safety procedures and emergency stops",
    ],
  },
  support: {
    headline: "Support Model",
    description:
      "Local presence means rapid response when you need it.",
    features: [
      { title: "Phone Support", detail: "Same-day response during business hours" },
      { title: "Remote Diagnostics", detail: "Screen share troubleshooting" },
      { title: "On-Site Service", detail: "Next-day dispatch for critical issues" },
      { title: "Preventive Maintenance", detail: "Optional annual service contracts" },
      { title: "Spare Parts", detail: "Common consumables stocked locally" },
    ],
  },
};

export const aboutContent = {
  headline: "About Eagle Automation",
  intro:
    "Eagle Automation is the automation integration division of Eagle Machine, Inc. — a FANUC Authorized System Integrator based in Arlington, TX. We define, design, integrate, train, and support customized robotic systems for manufacturers.",
  positioning: {
    headline: "Authorized FANUC System Integrator",
    description:
      "We don't just sell robots. We engineer complete automation cells tailored to your process, your parts, and your floor. Every cell is designed, built, and commissioned by our team — from requirements scoping and ROI analysis through installation and ongoing support.",
  },
  services: [
    {
      title: "Requirements & Scoping",
      description: "Process evaluation, capability mapping, and ROI target definition.",
    },
    {
      title: "Design & Project Management",
      description: "Rigorous milestone tracking with tailored mechanical and electrical design.",
    },
    {
      title: "Full Integration",
      description: "Seamless communication between PLC, HMI, safety systems, and robot.",
    },
    {
      title: "Software & Programming",
      description: "Offline motion path planning, code development, and on-site refinement.",
    },
    {
      title: "Operator Training",
      description: "Empowering internal teams to maintain and expand systems independently.",
    },
    {
      title: "Ongoing Support",
      description: "Continued service, troubleshooting, and optimization post-installation.",
    },
  ],
  whyUs: [
    {
      title: "FANUC Authorized System Integrator",
      description:
        "Certified FANUC ASI deploying gold-standard automation. Deep experience with FANUC controls and robotics for seamless machine-to-robot integration.",
    },
    {
      title: "Local Presence",
      description:
        "Based in Arlington, TX, we provide rapid on-site support throughout Texas and surrounding states. Next-day dispatch for critical issues.",
    },
    {
      title: "Machine Tool Background",
      description:
        "We understand CNC processes, not just robotics. Our solutions account for chip management, coolant, and the realities of metalworking.",
    },
    {
      title: "ROI Focus",
      description:
        "Every proposal includes detailed financial analysis with 5-year projections. We only recommend automation that makes economic sense for your operation.",
    },
  ],
  strategicAdvantages: [
    {
      title: "Robots Don't Call In Sick",
      description: "Consistent output rates with 24/7 availability. No vacation, lunch breaks, or sick days.",
    },
    {
      title: "Consistent Uptime & Reliability",
      description: "Eliminate unexpected absences. Predictable operations with zero absenteeism.",
    },
    {
      title: "Improve Employee Retention",
      description: "Offload dirty, dangerous, and repetitive tasks. Upskill humans to programming and quality control.",
    },
    {
      title: "Help Companies Grow",
      description: "Increased productivity, quality, and throughput. Win reshoring opportunities and expand capacity.",
    },
    {
      title: "Easy to Use",
      description: "Modern teach pendants and intuitive interfaces. Offline programming allows testing without downtime.",
    },
  ],
  eagleMachine: {
    headline: "Eagle Machine, Inc.",
    description:
      "Our parent company represents leading CNC machine tool brands and provides sales, service, and applications support across Texas. Eagle Automation extends that capability into turnkey robotic automation as a FANUC Authorized System Integrator.",
    link: "https://eaglemachine.net",
  },
};

export const contactContent = {
  headline: "Scope Your Automation",
  subheadline:
    "Tell us about your process and we'll provide a preliminary scope and ROI estimate within one business day.",
  formFields: [
    { name: "company", label: "Company Name", type: "text", required: true },
    { name: "name", label: "Contact Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: false },
    { name: "machineModel", label: "Machine Model", type: "text", required: false, placeholder: "e.g., FANUC Robodrill, Mazak QT" },
    { name: "controlType", label: "Control Type", type: "text", required: false, placeholder: "e.g., FANUC 0i, Siemens 840D" },
    { name: "cycleTime", label: "Cycle Time (seconds)", type: "number", required: false },
    { name: "partWeight", label: "Part Weight (lbs)", type: "number", required: false },
    { name: "shiftsPerDay", label: "Shifts Per Day", type: "select", options: ["1", "2", "3"], required: false },
    { name: "laborRate", label: "Labor Rate ($/hr)", type: "number", required: false, placeholder: "22" },
    { name: "annualVolume", label: "Annual Volume", type: "number", required: false },
    { name: "notes", label: "Additional Notes", type: "textarea", required: false },
  ],
};

export const roiDefaults = {
  laborRate: 22,
  shiftsPerDay: 2,
  hoursPerShift: 8,
  daysPerWeek: 5,
  weeksPerYear: 50,
  robotInvestment: 54885,
};
