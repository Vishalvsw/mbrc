import {
  Project,
  MediaItem,
  Enquiry,
  LeadershipMember,
  ServiceItem,
  InfrastructureFacility,
  MachineryItem,
  Milestone,
  CompanyContent,
  QualitySafetyData
} from '../types';

export const initialCompanyContent: CompanyContent = {
  heroTagline: 'MBRC & INFRASTRUCTURE PRIVATE LIMITED',
  heroHeadline: 'YOU DREAM IT. WE BUILD IT.',
  heroSecondary: 'Professional construction and infrastructure solutions built with quality, precision and commitment.',
  heroDescription: 'A premier corporate infrastructure enterprise delivering high-specification road networks, captive aggregate manufacturing plants, and heavy civil works across Karnataka and Southern India.',
  heroBgImage: '/photo/riyaz.png',
  companyOverview: 'Founded on over five decades of multi-generational civil engineering excellence, MBRC & Infrastructure Private Limited is a premier EPC contracting company. We integrate captive manufacturing plants—including high-capacity stone crushers, VSI M-sand facilities, and asphalt drum mix plants—with seasoned on-site project management to deliver landmark transportation corridors and civil works.',
  companyShortDesc: 'Precision engineering, captive heavy plant infrastructure, and reliable project delivery across Karnataka and Southern India.',
  whyChooseUs: [
    {
      id: 'w-1',
      title: 'Captive Material Supply Chain',
      description: 'Self-reliant with our own stone crushers, VSI M-sand plants, and computerized hot-mix facilities ensuring zero project delays.',
      icon: 'Factory'
    },
    {
      id: 'w-2',
      title: 'Modern Heavy Equipment Fleet',
      description: 'Extensive fleet of hydraulic motor graders, sensor pavers, and vibratory compactors ensuring exact tolerances.',
      icon: 'Truck'
    },
    {
      id: 'w-3',
      title: 'Direct Field Leadership',
      description: 'Executive directors and registered civil engineers stationed on-site daily, eliminating communication bottlenecks.',
      icon: 'HardHat'
    },
    {
      id: 'w-4',
      title: 'In-House Material Testing',
      description: 'Continuous laboratory sieve analysis, cube compressive strength tests, and bitumen temperature monitoring.',
      icon: 'CheckCircle2'
    }
  ],
  aboutMission: 'To engineer enduring highways, robust rural corridors, and precision civil structures that elevate regional economic connectivity while setting benchmarks in material purity, ecological responsibility, and project timeliness.',
  aboutVision: 'To be South India’s most trusted engineering and materials contractor, recognized for direct owner accountability, cutting-edge automated plant technology, and zero-defect infrastructure delivery.',
  coreValues: [
    {
      title: 'Quality & Precision',
      description: 'Zero compromise on material purity, density, and structural design standards.',
      icon: 'Award'
    },
    {
      title: 'Safety Commitment',
      description: 'Comprehensive site protocols ensuring safe working environments for all teams.',
      icon: 'Shield'
    },
    {
      title: 'Integrity & Trust',
      description: 'Transparent contractual execution, honest measurements, and reliable delivery.',
      icon: 'CheckSquare'
    },
    {
      title: 'Operational Reliability',
      description: 'Captive plants and synchronized equipment fleets guarantee timeline adherence.',
      icon: 'Clock'
    },
    {
      title: 'Client & Community Focus',
      description: 'Building infrastructure that enriches communities and satisfies all statutory authorities.',
      icon: 'Users'
    }
  ],
  qualityStatement: 'Build it right. Build it responsibly. Build it to last.',
  safetyStatement: 'A successful project is a project completed safely.',
  contactAddress: '2-475/68, Bhatambra, Tq. Bhalki, Bidar, Karnataka – 585411, India',
  contactPhone: '+91 97310 49500',
  contactEmail: 'inframbrc@gmail.com',
  whatsappNumber: '+919731049500',
  workingHours: 'Monday – Saturday: 8:00 AM – 7:00 PM',
  managingDirectorName: 'Riyaz Ahmed',
  cinNumber: 'U45309KA2021PTC146469',
  headquarters: 'Bhatambra, Bhalki, Bidar, Karnataka',
};

export const initialQualitySafetyData: QualitySafetyData = {
  qualityPolicy: 'At MBRC & Infrastructure Private Limited, quality is engineered into every stage of project delivery. From quarry-face selection to final sensor-paved bituminous concrete, we maintain continuous compliance with MoRTH, IRC, and PWD specifications.',
  safetyPolicy: 'Safety is non-negotiable. Every site operates under strict safety protocols including mandatory personal protective equipment (PPE), daily toolbox talks, machinery pre-operation checks, and designated emergency response teams.',
  executionCommitment: 'We guarantee execution excellence through captive material control, direct director supervision on site, and automated batching precision.',
  certifications: [
    {
      id: 'cert-1',
      title: 'ISO 9001:2015 Quality Management System',
      issuer: 'International Standards Certification',
      year: '2022',
      verified: true
    },
    {
      id: 'cert-2',
      title: 'ISO 45001:2018 Occupational Health & Safety',
      issuer: 'Safety & Health Standards Authority',
      year: '2023',
      verified: true
    },
    {
      id: 'cert-3',
      title: 'Class-I PWD EPC Contractor Registration',
      issuer: 'Public Works Department, Karnataka',
      year: '2021',
      verified: true
    }
  ],
  safetyRules: [
    'Mandatory high-visibility jackets, hard hats, and steel-toe boots for all personnel.',
    'Daily morning "Toolbox Talks" reviewing specific risk factors and site traffic management.',
    'Compulsory machinery inspection checklists prior to daily equipment ignition.',
    'Automated misting and dust suppression systems at all crushing and batching plants.',
    'Zero-tolerance policy for unsafe equipment operation or uncertified rigging.'
  ],
  documents: [
    {
      id: 'doc-1',
      title: 'Corporate Environmental & Safety Protocol',
      size: '2.4 MB',
      type: 'PDF',
      url: '#'
    },
    {
      id: 'doc-2',
      title: 'Aggregate Quality Testing Sieve Analysis Report',
      size: '1.8 MB',
      type: 'PDF',
      url: '#'
    },
    {
      id: 'doc-3',
      title: 'Captive Plant Safety Audit & Compliance Report',
      size: '3.1 MB',
      type: 'PDF',
      url: '#'
    }
  ]
};

export const initialMilestones: Milestone[] = [
  {
    year: '1972',
    title: 'The Foundation — Late Maqbool Ahmed',
    subtitle: 'Laying the Foundations of Modern Infrastructure',
    description: 'The family construction journey commenced with patriarch Late Maqbool Ahmed executing foundational civil contracts for National Highways, Karnataka Housing Board (KHB), and irrigation networks.',
    badge: 'Foundational Era',
    highlights: [
      'National Highway strategic pavement and earthwork contracts',
      'Karnataka Housing Board large-scale community developments',
      'Major canal and irrigation lining infrastructure projects',
      'Established foundational trust with state engineering boards'
    ],
    image: '/photo/riyaz.png'
  },
  {
    year: '1990s – 2010s',
    title: 'Generational Modernization',
    subtitle: 'Five Sons Modernize & Expand Fleet',
    description: 'The legacy was carried forward by Late Maqbool Ahmed’s five sons, modernizing equipment, expanding into asphalt hot-mix operations, and establishing quarrying concessions across Bidar and northern Karnataka.',
    badge: 'Generational Growth',
    highlights: [
      'Transition from conventional manual paving to mechanized operations',
      'Establishment of captive quarry concessions and aggregate processing',
      'Expansion into Major District Roads (MDR) and State Highways (SH)',
      'Direct on-site leadership model institutionalized across all five brothers'
    ],
    image: '/photo/maqbool.png'
  },
  {
    year: '2021',
    title: 'Corporate Incorporation',
    subtitle: 'MBRC & Infrastructure Private Limited',
    description: 'Formal corporate consolidation and incorporation of MBRC & Infrastructure Private Limited (CIN: U45309KA2021PTC146469), unifying contracting operations and heavy plants under unified governance.',
    badge: 'Corporate Transformation',
    highlights: [
      'Incorporated on 13 April 2021 with Registrar of Companies, Karnataka',
      'Centralized capital deployment into automated 3-stage crushing & batching plants',
      'Registration as Class-I contractor with PWD, KKRDB, and national tenders',
      'Digital project monitoring, ERP integration, and in-house laboratory testing'
    ],
    image: '/photo/maqbool.png'
  },
  {
    year: 'Present',
    title: 'Integrated Heavy Infrastructure Powerhouse',
    subtitle: 'Complete Self-Reliance from Quarry to Highway',
    description: 'Today, MBRC stands as an autonomous infrastructure enterprise operating stone crushers, VSI M-Sand plants, sand washing systems, 60 m³/hr batching plants, automated hot-mix plants, and sensor pavers.',
    badge: 'Modern Capability',
    highlights: [
      'Captive industrial stone crushing facility in Khudavandpoor, Bhalki',
      'Captive M-Sand & high-velocity washing plant eliminating river sand reliance',
      'End-to-end execution of KKRDB, PWD, and Highway corridors',
      'In-house certified material quality testing laboratory'
    ],
    image: ''
  }
];

export const meaningOfMbrcData = [
  {
    letter: 'M',
    title: 'Maqbool',
    subtitle: 'The Founding Father & Moral Compass',
    description: 'Late Maqbool Ahmed, whose unwavering grit on rugged highway terrains in 1972 laid our foundational standard: honest materials, respected laborers, and steadfast commitment to contract promises.'
  },
  {
    letter: 'B',
    title: 'Beepasha Begum',
    subtitle: 'The Family Matriarch & Spiritual Pillar',
    description: 'The beloved mother and matriarch whose enduring blessing, unity, and resilience hold the family together across decades of tireless work and generational expansion.'
  },
  {
    letter: 'R',
    title: 'Riyaz',
    subtitle: 'The Driving Leadership & Execution Engine',
    description: 'Riyaz Ahmed, Managing Director, embodying the modern ethos of dynamic field-first leadership, technological investment in captive plants, and aggressive business growth.'
  },
  {
    letter: 'C',
    title: 'Construction',
    subtitle: 'Our Bloodline, Profession & Purpose',
    description: 'More than an industry, construction is our family’s life work. From stone crushing and asphalt laying to bridge piers and highway arteries, we shape the physical world.'
  }
];

export const initialLeadership: LeadershipMember[] = [
  {
    id: 'lead-1',
    name: 'Riyaz Ahmed',
    title: 'Managing Director',
    focus: [
      'Field Project Execution',
      'Infrastructure Development',
      'Heavy Plant Technology & Industrial Strategy',
      'Hands-on Ground Management'
    ],
    statement: '“Be present where the work happens.”',
    bio: 'With over three decades of intense, hands-on construction immersion, Riyaz Ahmed spearheads MBRC’s day-to-day operations and strategic direction. Known throughout the regional contracting fraternity for his direct presence at asphalt hot-mix plants at 4:00 AM and site inspections at remote highway cuts, he ensures that MBRC’s promises are backed by real site momentum.',
    image: '/photo/riyaz.png',
    experienceYears: 32,
    highlightPoints: [
      'Personally oversees the commissioning of all captive plant infrastructure',
      'Champion of strict compaction, grading, and asphalt temperature protocols',
      'Led the corporate transition into MBRC & Infrastructure Private Limited',
      'Maintains direct, accessible communication with client engineers and village panchayats'
    ],
    socialLink: 'https://linkedin.com',
    published: true
  },
  {
    id: 'lead-2',
    name: 'Iliyas Ahmed',
    title: 'Director — Supply Chain & Logistics',
    focus: [
      'Procurement & Supply Chain Logistics',
      'Material Quality Operations',
      'Vendor Strategic Partnerships',
      'Heavy Fleet Mobilization'
    ],
    statement: '“Smooth logistics turn engineering blueprints into finished roadways on schedule.”',
    bio: 'Iliyas Ahmed governs MBRC’s extensive supply chain, fuel logistics, bitumen procurement, and heavy fleet allocation. His rigorous scheduling ensures our stone crushers and batching plants never face material bottlenecks, guaranteeing continuous uninterrupted site progress.',
    image: '/photo/iliyas.png',
    experienceYears: 28,
    highlightPoints: [
      'Manages high-volume bitumen and cement bulk procurement contracts',
      'Oversees daily fleet movements of tippers, tankers, and transit mixers',
      'Maintains zero-downtime preventative maintenance programs for heavy earthmovers'
    ],
    socialLink: 'https://linkedin.com',
    published: true
  },
  {
    id: 'lead-3',
    name: 'Mushtaq Ahmed',
    title: 'Director — Public Affairs & Institutional Relations',
    focus: [
      'Civic & Community Relations',
      'Statutory Compliance & Regional Growth',
      'Public Works Interfacing',
      'Former Zilla Panchayat (ZP) Member, Bidar'
    ],
    statement: '“Infrastructure serves the public; our works must respect and uplift the rural communities we touch.”',
    bio: 'A respected public figure and former Zilla Panchayat (ZP) Member from Bidar, Mushtaq Ahmed brings unmatched understanding of regional administrative systems, democratic governance, and local community dynamics. He ensures seamless right-of-way alignment, public safety compliance, and community goodwill during major corridor executions.',
    image: '/photo/mushtaq.png',
    experienceYears: 30,
    highlightPoints: [
      'Former elected Zilla Panchayat Member with profound governance expertise',
      'Bridges regional development goals with swift on-ground infrastructure deployment',
      'Spearheads CSR initiatives including rural road safety campaigns and water tank desilting'
    ],
    socialLink: 'https://linkedin.com',
    published: true
  },
  {
    id: 'lead-4',
    name: 'Khaleel Ahmed',
    title: 'Director — Plant Governance & Mining',
    focus: [
      'Quarry Operations & Crushing Plant Governance',
      'Mining Safety & Environmental Clearances',
      'Aggregate Grading & M-Sand Quality',
      'Production Cost Optimization'
    ],
    statement: '“The strength of a road lies in the density and geometry of the stone beneath it.”',
    bio: 'Khaleel Ahmed manages MBRC’s flagship Riyaz Stone Crusher and manufacturing plants in Khudavandpoor, Bhalki Taluka. An expert in rock mechanics, secondary impactors, and hydro-cyclone sand washing, he guarantees aggregates that surpass stringent PWD and MORTH specifications.',
    image: '/photo/khaleel.png',
    experienceYears: 26,
    highlightPoints: [
      'Oversees 250 TPH automated 3-stage crushing circuits',
      'Pioneered in-house VSI manufactured sand (M-Sand) conforming to IS 383 Zone II',
      'Strict adherence to Directorate General of Mines Safety (DGMS) regulations'
    ],
    socialLink: 'https://linkedin.com',
    published: true
  },
  {
    id: 'lead-5',
    name: 'Ejaz Ahmed',
    title: 'Director — Field Quality & Operations',
    focus: [
      'Site Engineering Operations',
      'Workforce Welfare & Site Supervisors',
      'Safety Protocols & Field QC Testing',
      'Contract Closeout & Measurement'
    ],
    statement: '“Disciplined workmanship on the ground produces structures that endure for generations.”',
    bio: 'Ejaz Ahmed leads ground-level workforce deployment, camp establishment, site engineer briefings, and field test verifications. Living at site camps during peak mobilization, his vigilant eye ensures daily compaction tests, cube casting, and safety harnesses are non-negotiable.',
    image: '/photo/ejaz.png',
    experienceYears: 24,
    highlightPoints: [
      'Direct command over 200+ site operators, masons, and machine crew members',
      'Instituted daily "Toolbox Safety Talks" across all operational highway stretches',
      'Ensures prompt field density testing (FDD) and core extraction verification'
    ],
    socialLink: 'https://linkedin.com',
    published: true
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'road-construction',
    slug: 'road-construction',
    title: 'Road Construction & Development',
    shortDesc: 'End-to-end arterial road construction, widening, and structural pavement improvements.',
    description: 'We execute complete greenfield and brownfield road construction projects including subgrade preparation, granular sub-base (GSB), wet mix macadam (WMM), dense bituminous macadam (DBM), and bituminous concrete (BC). From multi-lane state corridors to vital rural lifelines, our projects are engineered for extreme heavy axle loads.',
    iconName: 'Route',
    subServices: [
      'Complete road construction from earthwork to final wearing course',
      'Road widening and geometric corridor realignment',
      'Pavement strengthening and structural overlays',
      'Rural connectivity roads under PMGSY and state schemes',
      'Major road infrastructure and intersection designs',
      'Preventive road maintenance and surface sealing'
    ],
    image: '/photo/riyaz.png',
    gallery: [
      '/photo/riyaz.png',
      '/photo/riyaz.png',
      '/photo/riyaz.png'
    ],
    processSteps: [
      { step: '01', title: 'Topographical Survey', desc: 'Total station and digital level surveys for accurate corridor profile.' },
      { step: '02', title: 'Subgrade Preparation', desc: 'Excavation, moisture optimization, and vibratory compaction to ≥ 98% MDD.' },
      { step: '03', title: 'Base Courses (GSB & WMM)', desc: 'Mechanical laying of graded aggregates with automatic sensor grading.' },
      { step: '04', title: 'Bituminous Paving', desc: 'Controlled hot-mix application using electronic sensor pavers.' },
      { step: '05', title: 'Quality Audits & Markings', desc: 'Core extraction, roughness testing, and thermoplastic reflective markings.' }
    ],
    specifications: [
      { label: 'Pavement Types', value: 'Flexible Asphalt & Rigid Concrete' },
      { label: 'Design Standard', value: 'MoRTH 5th Revision & IRC:37' },
      { label: 'Sensor Paver Width', value: 'Up to 9.0 meters continuous' },
      { label: 'Quality Control', value: 'In-house Sieve & Compaction Lab' }
    ],
    seoTitle: 'Road Construction & Highway Development | MBRC & Infrastructure',
    seoDescription: 'Professional road construction, widening, and structural pavement services executed with captive plants and sensor pavers.',
    published: true,
    order: 1
  },
  {
    id: 'highway-infrastructure',
    slug: 'highway-infrastructure',
    title: 'Highway Infrastructure',
    shortDesc: 'High-speed highway improvements, multi-lane carriageways, and integrated drainage.',
    description: 'Specializing in high-standard highway improvements, bypass developments, and toll-grade corridors. Our sensor pavers and electronic mix plants guarantee smooth riding quality with strict International Roughness Index (IRI) compliance.',
    iconName: 'Compass',
    subServices: [
      'State Highway (SH) and National Highway (NH) corridor improvements',
      'Rigid & flexible pavement construction with automated sensor pavers',
      'Integrated longitudinal storm drainage and culvert structures',
      'Highway road widening, shoulder stabilization, and signage installation',
      'Structural box culverts, minor bridges, and cross-drainage assets'
    ],
    image: '/photo/iliyas.png',
    gallery: [
      '/photo/riyaz.png',
      '/photo/riyaz.png'
    ],
    processSteps: [
      { step: '01', title: 'Alignment Engineering', desc: 'Optimization of horizontal and vertical highway geometry.' },
      { step: '02', title: 'Bridge & Culvert Works', desc: 'Heavy reinforced concrete structures built prior to pavement laying.' },
      { step: '03', title: 'Multi-layer Heavy Paving', desc: 'Consecutive DBM and BC courses laid at controlled temperatures.' },
      { step: '04', title: 'Safety Infrastructure', desc: 'W-beam crash barriers, high-intensity signage, and solar road studs.' }
    ],
    specifications: [
      { label: 'Speed Rating', value: 'Up to 100 km/h Design Speed' },
      { label: 'Axle Load Capacity', value: 'IRC Heavy Axle Conforming' },
      { label: 'Roughness Index (IRI)', value: '< 2.0 m/km Guaranteed' }
    ],
    published: true,
    order: 2
  },
  {
    id: 'earthwork-site-dev',
    slug: 'earthwork-site-dev',
    title: 'Earthwork & Site Development',
    shortDesc: 'Mass excavation, heavy embankment compaction, murrum filling, and ground stabilization.',
    description: 'Utilizing heavy hydraulic excavators, articulated motor graders, and high-energy vibratory rollers to transform difficult topography into engineered, stable foundations for roadways, industrial plants, and civil works.',
    iconName: 'Shovel',
    subServices: [
      'Mass earth excavation in soil, soft rock, and blasted hard rock',
      'Engineered embankment construction with tested compaction layers',
      'Selected murrum filling, leveling, and soil stabilization',
      'Subgrade preparation and proof-rolling tests',
      'Site development, drainage shaping, and land grading'
    ],
    image: '/photo/ejaz.png',
    gallery: [
      '/photo/riyaz.png',
      '/photo/riyaz.png'
    ],
    processSteps: [
      { step: '01', title: 'Soil Classification', desc: 'Atterberg limits, Proctor density, and CBR evaluation.' },
      { step: '02', title: 'Mass Cut & Fill', desc: 'Balanced earth movement with excavator and tipper fleets.' },
      { step: '03', title: 'Layered Compaction', desc: '200mm maximum loose layers compacted with heavy rollers.' }
    ],
    specifications: [
      { label: 'Daily Fleet Output', value: '4,000 m³ / day excavation' },
      { label: 'Compaction Quality', value: '≥ 98% Proctor Density' }
    ],
    published: true,
    order: 3
  },
  {
    id: 'concrete-works',
    slug: 'concrete-works',
    title: 'Concrete Works',
    shortDesc: 'Cement concrete (CC) roads, structural bridge elements, and heavy concrete pavements.',
    description: 'From high-durability M30/M40 concrete roads to structural retaining elements, we utilize captive computerized batching plants and automated transit mixers to maintain exact water-cement ratios and compressive strengths.',
    iconName: 'Building2',
    subServices: [
      'Cement Concrete (CC) village and urban roads with dowel bar joints',
      'Concrete pavements and heavy vehicle parking yards',
      'Heavy reinforced concrete drainage structures and conduits',
      'Precast and cast-in-situ structural civil installations',
      'Laboratory compressive strength cube testing and slump control'
    ],
    image: '/photo/riyaz.png',
    gallery: [
      '/photo/Concrete Works.png'
    ],
    processSteps: [
      { step: '01', title: 'Mix Design & Batching', desc: 'Computerized SCADA control of cement, aggregates, and admixtures.' },
      { step: '02', title: 'Transit Dispatch', desc: 'Dispatched via our own 6m³ transit mixer fleet.' },
      { step: '03', title: 'Pouring & Screeding', desc: 'Mechanized vibrating screeds and surface texturing.' },
      { step: '04', title: 'Curing & Joint Cutting', desc: 'Timely groove cutting and water curing ponding.' }
    ],
    specifications: [
      { label: 'Plant Rating', value: '60 m³ / hr continuous' },
      { label: 'Concrete Grades', value: 'M15 to M45 Structural' }
    ],
    published: true,
    order: 4
  },
  {
    id: 'retaining-structural-works',
    slug: 'retaining-structural-works',
    title: 'Retaining & Structural Works',
    shortDesc: 'Reinforced earth retaining walls, hillside protection, and critical hydraulic retaining.',
    description: 'Engineered structural protection works built to withstand hydrostatic pressure, soil erosion, and hydraulic forces along high embankments, water crossings, and railway overpasses.',
    iconName: 'Shield',
    subServices: [
      'Reinforced concrete retaining walls (cantilever and counterfort)',
      'Stone masonry breast walls and retaining structures',
      'Slope protection, gabion revetments, and pitching works',
      'Roadside structural drainage and velocity dissipation chutes',
      'Approach embankment stabilization for bridges and culverts'
    ],
    image: '/photo/riyaz.png',
    gallery: [
      '/photo/riyaz.png'
    ],
    processSteps: [
      { step: '01', title: 'Geotechnical Bearing Check', desc: 'Soil bearing capacity and sliding stability computations.' },
      { step: '02', title: 'Steel Reinforcement', desc: 'Precision bar-bending conforming to structural drawings.' },
      { step: '03', title: 'Formwork & Concreting', desc: 'Rigid steel shuttering and systematic concrete vibrator passes.' }
    ],
    specifications: [
      { label: 'Structure Types', value: 'Cantilever RCC, Gravity Stone Masonry' },
      { label: 'Backfill Material', value: 'Free-draining filter media with weep holes' }
    ],
    published: true,
    order: 5
  },
  {
    id: 'asphalt-bituminous-works',
    slug: 'asphalt-bituminous-works',
    title: 'Asphalt & Bituminous Works',
    shortDesc: 'Hot-mix asphalt, dense bituminous macadam, and electronic sensor resurfacing.',
    description: 'Operating our own high-capacity hot-mix plant with computerized burner controls, we produce premium asphalt mixtures strictly at required laying temperatures, paired with pneumatic and tandem rollers for flawless finish.',
    iconName: 'Flame',
    subServices: [
      'Continuous hot-mix production with automated aggregate blending',
      'Dense Bituminous Macadam (DBM) structural laying',
      'Bituminous Concrete (BC) wearing coat execution',
      'Tack coat and prime coat mechanical spraying',
      'Pavement resurfacing, milling, and asphalt rehabilitation'
    ],
    image: '/photo/riyaz.png',
    gallery: [
      '/photo/riyaz.png'
    ],
    processSteps: [
      { step: '01', title: 'Plant Mix Formulation', desc: 'Marshalls stability and bitumen content optimization.' },
      { step: '02', title: 'Insulated Haulage', desc: 'Tarpaulin-covered tippers transporting mix at 150°C+.' },
      { step: '03', title: 'Sensor Paver Laying', desc: 'Uniform thickness control across variable widths.' },
      { step: '04', title: 'Three-Stage Rolling', desc: 'Breakdown, intermediate pneumatic, and final steel drum finish.' }
    ],
    specifications: [
      { label: 'Hot Mix Capacity', value: '120 Tons Per Hour' },
      { label: 'Bitumen Grade', value: 'VG-30 / VG-40 Tested' }
    ],
    published: true,
    order: 6
  },
  {
    id: 'material-production',
    slug: 'material-production',
    title: 'Material Production',
    shortDesc: 'Captive stone crushing, manufactured sand (M-Sand), and hydro-washing plants.',
    description: 'We do not rely on third-party suppliers. Our industrial facility in Khudavandpoor produces cubical crushed aggregate, VSI M-sand, and washed plaster sand conforming to IS 383, supplying our own projects and regional clients.',
    iconName: 'Layers',
    subServices: [
      'Multi-stage stone crushing (40mm, 20mm, 10mm, 6mm aggregate)',
      'Vertical Shaft Impactor (VSI) Manufactured Sand (M-Sand)',
      'Hydro-cyclone M-Sand washing for zero silt and clay content',
      'Granular Sub-Base (GSB) and Wet Mix Macadam (WMM) blending',
      'Rigorous in-house mechanical sieve analysis and flakiness index testing'
    ],
    image: '/photo/khaleel.png',
    gallery: [
      '/photo/khaleel.png',
      '/photo/khaleel.png'
    ],
    processSteps: [
      { step: '01', title: 'Quarry Extraction', desc: 'Hard basalt rock mining and primary jaw reduction.' },
      { step: '02', title: 'Cone Secondary Crushing', desc: 'Secondary reduction into cubical aggregate fractions.' },
      { step: '03', title: 'VSI Sand Shaping', desc: 'Rock-on-rock high-velocity impact for cubical sand grains.' },
      { step: '04', title: 'Hydro-Wash & Dewatering', desc: 'Cyclone silt extraction delivering clean moisture-controlled sand.' }
    ],
    specifications: [
      { label: 'Crusher Capacity', value: '250 Tons Per Hour' },
      { label: 'M-Sand Production', value: '120 TPH (IS 383 Zone II)' },
      { label: 'Wash Rating', value: 'Silt Content < 2.5%' }
    ],
    published: true,
    order: 7
  }
];

export const initialInfrastructure: InfrastructureFacility[] = [
  {
    id: 'crusher-plant',
    name: 'Riyaz Stone Crusher',
    location: 'Khudavandpoor Village, Bhalki Taluka, Bidar District',
    tagline: 'High-Capacity 3-Stage Crushing Facility',
    capacity: '250 TPH (Tons Per Hour)',
    description: 'Our flagship aggregate processing facility operating captive hard basalt quarries. Engineered with heavy jaw crushers, secondary cone crushers, and triple-deck vibrating screens to generate precision cubical aggregate.',
    keySpecs: [
      { label: 'Installed Capacity', value: '250 TPH' },
      { label: 'Technology', value: '3-Stage Jaw & Cone Circuit' },
      { label: 'Products', value: '40mm, 20mm, 10mm, 6mm & GSB' },
      { label: 'Power Backup', value: 'Captive Heavy Diesel Gensets' }
    ],
    features: [
      'Direct quarry-to-feeder conveyor flow minimizing handling dust',
      'Automated loadout weighbridge with computer-generated slips',
      'Flakiness and elongation index controlled strictly below 15%',
      'Environmental dust suppression misting systems installed'
    ],
    image: '/photo/khaleel.png'
  },
  {
    id: 'msand-plant',
    name: 'M-Sand Plant',
    location: 'Khudavandpoor Village, Bhalki Taluka',
    tagline: 'VSI Precision Manufactured Sand Facility',
    capacity: '120 TPH Engineered Sand Output',
    description: 'Advanced Vertical Shaft Impactor (VSI) rock-on-rock crushing system producing manufactured sand with cubical particle geometry, ideally graded to match IS 383 Zone II specifications for high-strength concrete.',
    keySpecs: [
      { label: 'Crushing Tech', value: 'High-Velocity VSI Rock-on-Rock' },
      { label: 'Output Grade', value: 'Zone II (0 - 4.75mm)' },
      { label: 'Application', value: 'Structural Concrete & Pavements' },
      { label: 'Eco Impact', value: '100% River-Bed Protection' }
    ],
    features: [
      'Uniform grading curves providing superior concrete workability',
      'Eliminates organic impurities and river sand silt contamination',
      'Increases structural concrete compressive strength by 10-15%',
      'Continuous round-the-clock production capacity'
    ],
    image: '/photo/khaleel.png'
  },
  {
    id: 'washing-plant',
    name: 'M-Sand Washing Plant',
    location: 'Khudavandpoor Industrial Complex',
    tagline: 'Hydro-Cyclone Silt Separation & Water Recycling',
    capacity: '100 TPH Ultra-Clean Washed Sand',
    description: 'State-of-the-art hydro-cyclone washing plant that extracts micro-fines, silt, and clay particles below 75 microns, delivering pristine washed sand suitable for high-grade plastering and structural ready-mix concrete.',
    keySpecs: [
      { label: 'Washing Tech', value: 'Hydro-Cyclone with Dewatering Screen' },
      { label: 'Silt Content', value: '< 2.5% (Strict PWD Standard)' },
      { label: 'Water Recovery', value: '85% Closed-Loop Recycled' },
      { label: 'Slurry Filter', value: 'Automated Thickener Tank' }
    ],
    features: [
      'Eliminates efflorescence and shrinkage cracking in finished concrete',
      'Eco-friendly closed-loop water treatment preserving groundwater',
      'Produces dry, ready-to-load sand directly from the dewatering deck',
      'Continuous quality monitoring in our on-site laboratory'
    ],
    image: '/photo/khaleel.png'
  },
  {
    id: 'batching-plant',
    name: 'Concrete Batching Plant',
    location: 'Bhalki Strategic Operational Base',
    tagline: 'Computerized PLC-Controlled RMC Plant',
    capacity: '60 m³/hr Continuous Mix',
    description: 'Fully automated electronic concrete batching plant equipped with precision aggregate weighing bins, computerized cement silos, admixture dosing pumps, and twin-shaft mixers delivering M15 to M45 concrete grades.',
    keySpecs: [
      { label: 'Batch Output', value: '60 m³ / hour' },
      { label: 'Mixer Type', value: 'Heavy Duty Twin Shaft' },
      { label: 'Cement Silos', value: '2 x 100 MT Storage' },
      { label: 'Delivery Fleet', value: 'Dedicated Transit Mixers' }
    ],
    features: [
      'Microprocessor PLC control eliminating manual weighing deviations',
      'Automated aggregate moisture compensation for precise W/C ratio',
      'Printout calibration tickets generated for every batch load',
      'Fleet of 6m³ transit mixers with GPS tracking for timely site arrival'
    ],
    image: '/photo/riyaz.png'
  },
  {
    id: 'hotmix-plant',
    name: 'Hot-Mix Plant',
    location: 'Central Highway Logistics Hub, Bidar',
    tagline: 'Electronic Continuous Asphalt Drum Mix Plant',
    capacity: '100 - 120 TPH Bituminous Mix',
    description: 'High-output asphalt drum mix plant designed for high-specification Dense Bituminous Macadam (DBM) and Bituminous Concrete (BC). Integrated with computer-controlled bitumen injection and electronic thermo-sensors.',
    keySpecs: [
      { label: 'Plant Rating', value: '120 Tons Per Hour' },
      { label: 'Burner Control', value: 'Automated Dual-Fuel Electronic Burner' },
      { label: 'Bitumen Tanks', value: '2 x 30 MT Thermic Fluid Heated' },
      { label: 'Emission System', value: 'Multi-Cyclone & Wet Scrubber' }
    ],
    features: [
      'Precise temperature control ensuring mix reaches road sites at 140°C - 160°C',
      'Four-bin cold aggregate feeder with variable frequency speed drives',
      'Hot elevator and insulated surge hopper for continuous tipper loading',
      'Pollution Control Board (KSPCB) certified emission scrubbers'
    ],
    image: '/photo/riyaz.png'
  }
];

export const initialMachinery: MachineryItem[] = [
  {
    id: 'mach-1',
    name: 'Hydraulic Motor Graders',
    category: 'Road Construction Equipment',
    model: 'CAT 120K / Liugong Articulated',
    specs: 'Heavy 14-foot moldboard, hydraulic blade tilt, precision road grading',
    description: 'Articulated motor graders dedicated to precise subgrade profiling, GSB laying, and WMM camber formation.',
    quantity: '4 Units',
    image: '/photo/riyaz.png',
    status: 'Operational',
    published: true
  },
  {
    id: 'mach-2',
    name: 'Electronic Sensor Asphalt Pavers',
    category: 'Road Construction Equipment',
    model: 'Vögele Super 1800 / Apollo Hydrostatic',
    specs: 'Up to 9m paving width, dual grade sensors, automatic ski leveling',
    description: 'High-precision asphalt paver with integrated screed heaters ensuring flawless International Roughness Index (IRI).',
    quantity: '2 Units',
    image: '/photo/riyaz.png',
    status: 'Deployed on Site',
    published: true
  },
  {
    id: 'mach-3',
    name: 'Heavy Hydraulic Excavators',
    category: 'Earthmoving Equipment',
    model: 'Tata Hitachi EX200 / Komatsu PC210',
    specs: '20-22 ton operating weight, 1.2 m³ bucket, rock breaker attachments',
    description: 'Heavy hydraulic excavators operating on quarry face excavation, deep road cuts, and canal earthworks.',
    quantity: '6 Units',
    image: '/photo/riyaz.png',
    status: 'Operational',
    published: true
  },
  {
    id: 'mach-4',
    name: 'Soil & Asphalt Vibratory Rollers',
    category: 'Compaction Equipment',
    model: 'Hamm 311 / Dynapac CA250D',
    specs: '11-12 ton soil compactors & tandem vibratory asphalt rollers',
    description: 'High-amplitude soil compactors ensuring subgrade density exceeding 98% modified Proctor standard.',
    quantity: '5 Units',
    image: '/photo/riyaz.png',
    status: 'Operational',
    published: true
  },
  {
    id: 'mach-5',
    name: 'Heavy Transit Mixers & Tippers',
    category: 'Haulage & Logistics',
    model: 'Tata Prima / BharatBenz Heavy Fleet',
    specs: '6m³ transit mixers, 16-25 ton multi-axle tippers, bitumen bowsers',
    description: 'Captive haulage fleet guaranteeing seamless transport from crushing plants to active highway fronts.',
    quantity: '22 Units',
    image: '/photo/riyaz.png',
    status: 'Operational',
    published: true
  },
  {
    id: 'mach-6',
    name: '3-Stage Industrial Stone Crusher',
    category: 'Material Production Plant',
    model: 'Riyaz 250 TPH Automated Circuit',
    specs: 'Heavy jaw crusher, secondary cone, triple-deck screening, mist suppression',
    description: 'Flagship industrial basalt crushing facility producing certified cubical road aggregates.',
    quantity: '1 Plant',
    image: '/photo/khaleel.png',
    status: 'Operational',
    published: true
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Widening & Strengthening of Bhalki - Humnabad State Highway Corridor',
    location: 'Bhalki to Humnabad, Bidar District, Karnataka',
    projectType: 'State Highway Expansion & Bituminous Overlay',
    category: 'SH Roads',
    description: 'Comprehensive 2-lane to 4-lane widening, subgrade stabilization, granular sub-base, dense bituminous macadam, and BC wearing course with engineered roadside RCC drains and safety parapets.',
    images: [
      '/photo/riyaz.png',
      '/photo/riyaz.png',
      '/photo/riyaz.png'
    ],
    completionYear: 2024,
    startDate: '2023-01',
    completionDate: '2024-06',
    client: 'Public Works Department (PWD), Government of Karnataka',
    lengthKm: '28.4 km',
    valueCr: '₹ 42.50 Cr',
    status: 'Completed',
    featured: true,
    published: true,
    scopeHighlights: [
      '28.4 km of dual carriageway asphalt paving',
      '14 box culverts reconstructed to IRC 70R standards',
      'Complete road signage, thermoplastic marking, and solar studs',
      'Laying completed 2 months ahead of statutory contract schedule'
    ]
  },
  {
    id: 'proj-2',
    name: 'KKRDB Critical Rural Connectivity Corridors (Package 4)',
    location: 'Aurad & Bhalki Taluks, Bidar, Karnataka',
    projectType: 'Rural Road Reconstruction & Concrete Pavement',
    category: 'KKRDB',
    description: 'Execution of critical rural connectivity stretches under Kalyana Karnataka Regional Development Board (KKRDB), connecting remote agricultural hamlets to main market talukas with heavy cement concrete (CC) pavements and cross-drainage works.',
    images: [
      '/photo/Project Image 1.png',
      '/photo/Project Image 2.png'
    ],
    completionYear: 2024,
    startDate: '2023-08',
    completionDate: '2024-04',
    client: 'Kalyana Karnataka Regional Development Board (KKRDB)',
    lengthKm: '36.8 km',
    valueCr: '₹ 28.20 Cr',
    status: 'Completed',
    featured: true,
    published: true,
    scopeHighlights: [
      'Heavy duty M30 CC pavement through village residential clusters',
      'Cast-in-situ storm drains preventing seasonal monsoon flooding',
      '100% captive M-Sand and Riyaz Crusher aggregate utilized'
    ]
  },
  {
    id: 'proj-3',
    name: 'Bidar - Basavakalyan Major District Road (MDR-18) Modernization',
    location: 'Basavakalyan Taluk, Bidar District',
    projectType: 'MDR Strengthening & Resurfacing',
    category: 'MDR Roads',
    description: 'Rehabilitation of heavily trafficked MDR link, featuring pavement milling, 150mm Wet Mix Macadam, 75mm Dense Bituminous Macadam (DBM), and 40mm Bituminous Concrete (BC) wearing course using electronic sensor pavers.',
    images: [
      '/photo/riyaz.png',
      '/photo/riyaz.png'
    ],
    completionYear: 2023,
    startDate: '2022-11',
    completionDate: '2023-10',
    client: 'Karnataka State Highway Improvement Project (KSHIP) / PWD',
    lengthKm: '22.0 km',
    valueCr: '₹ 19.80 Cr',
    status: 'Completed',
    featured: true,
    published: true,
    scopeHighlights: [
      'Engineered curve straightening reducing regional accident rates',
      'High-friction surface treatment on steep downhill gradients',
      'Precision asphalt joint cutting and sealant application'
    ]
  },
  {
    id: 'proj-4',
    name: 'Bhatambra Heavy Industrial Access Ring Corridor',
    location: 'Bhatambra Industrial Enclave, Bhalki',
    projectType: 'Industrial Pavement & Heavy Vehicle Transit Corridor',
    category: 'Highway Infrastructure',
    description: 'Engineered heavy-duty road corridor designed specifically for high-frequency multi-axle freight traffic, stone crusher tippers, and regional grain logistics.',
    images: [
      '/photo/riyaz.png',
      '/photo/riyaz.png'
    ],
    completionYear: 2025,
    startDate: '2024-03',
    completionDate: '2025-05',
    client: 'Industrial Area Development Board & Municipal Council',
    lengthKm: '11.5 km',
    valueCr: '₹ 14.50 Cr',
    status: 'In Progress',
    featured: true,
    published: true,
    scopeHighlights: [
      'Subgrade design evaluated for 150 MSA (Million Standard Axles)',
      'Reinforced concrete edge beams preventing lateral spread under loading',
      'Underground stormwater collection box ducts'
    ]
  }
];

export const initialMedia: MediaItem[] = [
  {
    id: 'med-1',
    title: 'Sensor Asphalt Paver Laying Bituminous Concrete',
    category: 'Projects',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'High-precision electronic sensor paver laying BC wearing course on Bhalki - Humnabad SH.',
    fileSize: '2.4 MB',
    uploadedAt: '2025-01-15',
    published: true,
    altText: 'Asphalt paver laying bituminous concrete on highway'
  },
  {
    id: 'med-2',
    title: 'Dual Drum Vibratory Roller Finish Compaction',
    category: 'Machinery',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'Tandem asphalt roller finishing dense bituminous macadam pavement.',
    fileSize: '3.1 MB',
    uploadedAt: '2025-01-20',
    published: true,
    altText: 'Compaction roller finishing highway asphalt'
  },
  {
    id: 'med-3',
    title: 'Riyaz Stone Crusher — Secondary Cone & 4-Deck Screen Plant',
    category: 'Plants',
    type: 'image',
    url: '/photo/riyaz.png',
    description: '3-stage 250 TPH aggregate crushing plant operating at Khudavandpoor, Bhalki.',
    fileSize: '4.2 MB',
    uploadedAt: '2025-02-05',
    published: true,
    altText: 'Stone crusher screening plant'
  },
  {
    id: 'med-4',
    title: 'Hydro-Cyclone VSI M-Sand Washing & Dewatering Unit',
    category: 'Plants',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'Automated sand washing system producing IS 383 Zone-II ultra-clean sand for concrete structures.',
    fileSize: '2.8 MB',
    uploadedAt: '2025-02-12',
    published: true,
    altText: 'Sand washing hydrocyclone plant'
  },
  {
    id: 'med-5',
    title: 'Computerized Asphalt Drum Mix Batching Plant (120 TPH)',
    category: 'Plants',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'Automated electronic hot mix asphalt plant ensuring precise bitumen-aggregate blending.',
    fileSize: '3.6 MB',
    uploadedAt: '2025-02-15',
    published: true,
    altText: 'Asphalt drum mix batching plant'
  },
  {
    id: 'med-6',
    title: 'Hydraulic Sensor Motor Grader Subgrade Levelling',
    category: 'Machinery',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'Heavy duty motor grader cutting exact camber slopes and subgrade profiles.',
    fileSize: '2.9 MB',
    uploadedAt: '2025-02-16',
    published: true,
    altText: 'Motor grader levelling road subgrade'
  },
  {
    id: 'med-7',
    title: 'Managing Director Riyaz Ahmed Reviewing Site Blueprints',
    category: 'Team',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'MD Riyaz Ahmed conducting dawn site inspection and corridor alignment checks.',
    fileSize: '1.9 MB',
    uploadedAt: '2025-02-18',
    published: true,
    altText: 'Managing Director on construction site'
  },
  {
    id: 'med-8',
    title: 'Manjra River Multi-Cell RCC Box Culvert & Embankment',
    category: 'Projects',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'High-water clearance cross-drainage culvert structure protecting highway from monsoon floods.',
    fileSize: '3.4 MB',
    uploadedAt: '2025-02-22',
    published: true,
    altText: 'Concrete box culvert and highway bridge'
  },
  {
    id: 'med-9',
    title: 'Volvo 210D Heavy Excavator Quarry Bench Operations',
    category: 'Machinery',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'Mass excavation and captive basalt rock loading at MBRC Khudavandpoor quarry.',
    fileSize: '3.8 MB',
    uploadedAt: '2025-02-25',
    published: true,
    altText: 'Heavy crawler excavator loading rocks'
  },
  {
    id: 'med-10',
    title: 'Aerial Drone Inspection: Bhalki-Humnabad Highway Package',
    category: 'Projects',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: '/photo/riyaz.png',
    description: 'Aerial telemetry and alignment inspection video of sensor-paved 4-lane state highway corridor.',
    fileSize: '18.4 MB',
    uploadedAt: '2025-03-01',
    published: true,
    altText: 'Drone inspection video of highway construction'
  },
  {
    id: 'med-11',
    title: 'Historic 1972 Founding PWD Corridor Construction Archive',
    category: 'Legacy',
    type: 'image',
    url: '/photo/riyaz.png',
    description: 'Archival heritage documentation of early rural roads engineered across Bidar district.',
    fileSize: '2.1 MB',
    uploadedAt: '2025-03-02',
    published: true,
    altText: 'Historic construction engineering archive'
  },
  {
    id: 'med-12',
    title: 'Karnataka Public Works Department Class-I EPC Registration',
    category: 'Documents',
    type: 'document',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Official Government of Karnataka Class-I Contractor License for high-value highway works.',
    fileSize: '1.8 MB',
    uploadedAt: '2025-03-03',
    published: true,
    altText: 'PWD Class-I EPC Registration Certificate'
  },
  {
    id: 'med-13',
    title: 'ISO 9001:2015 Quality Management Systems Accreditation',
    category: 'Documents',
    type: 'document',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'International quality compliance certification for civil construction and material batching.',
    fileSize: '2.2 MB',
    uploadedAt: '2025-03-04',
    published: true,
    altText: 'ISO 9001:2015 Certificate'
  },
  {
    id: 'med-14',
    title: 'NABL Marshall Stability Bituminous Concrete Mix Design Report',
    category: 'Documents',
    type: 'document',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Laboratory testing reports for BC / DBM binder course conforming to MoRTH Section 500.',
    fileSize: '3.5 MB',
    uploadedAt: '2025-03-05',
    published: true,
    altText: 'NABL Marshall Stability Mix Design Report'
  },
  {
    id: 'med-15',
    title: 'Department of Mines & Geology Captive Quarry Lease Clearance',
    category: 'Documents',
    type: 'document',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Environmental clearance & mining license for captive basalt quarry in Bhalki taluk.',
    fileSize: '2.7 MB',
    uploadedAt: '2025-03-06',
    published: true,
    altText: 'Quarry Lease & Environmental Clearance Certificate'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'MBRC-2026-0001',
    customerName: 'Rajesh Patil',
    company: 'Patil Warehousing & Logistics Parks',
    mobile: '+91 98450 12345',
    email: 'rajesh@patillogistics.com',
    projectType: 'Concrete Works',
    projectLocation: 'APMC Yard Extension, Bhalki',
    estimatedBudget: '₹ 3.5 Cr – ₹ 5.0 Cr',
    expectedStartDate: '2026-04-15',
    preferredContactMethod: 'Phone',
    message: 'We require 2.4 km of heavy-duty M35 grade concrete internal roads with RCC perimeter drainage inside the new APMC market yard. Seeking quotation with captive batching plant delivery.',
    uploadedFiles: [
      { id: 'f-1', name: 'APMC_Bhalki_Tender_Specifications.pdf', size: '3.4 MB', type: 'application/pdf' }
    ],
    date: '2026-03-04 10:45 AM',
    status: 'New',
    adminNotes: 'Assigned to MD Riyaz Ahmed for site inspection and batching plant supply feasibility.'
  },
  {
    id: 'MBRC-2026-0002',
    customerName: 'Anil Deshmukh',
    company: 'Deshmukh Infra Concessions Pvt Ltd',
    mobile: '+91 94221 67845',
    email: 'anil@deshmukhinfra.com',
    projectType: 'Material Production',
    projectLocation: 'Aurad to Bidar Highway Link',
    estimatedBudget: '₹ 8.0 Cr – ₹ 12.0 Cr',
    expectedStartDate: '2026-05-01',
    preferredContactMethod: 'Email',
    message: 'Need 65,000 MT of 40mm and 20mm crushed stone aggregate plus 30,000 MT washed M-sand over 6 months. Please provide ex-crusher rates from Khudavandpoor plant.',
    uploadedFiles: [
      { id: 'f-2', name: 'Material_Requirement_Schedule.xlsx', size: '1.2 MB', type: 'application/vnd.ms-excel' }
    ],
    date: '2026-03-02 02:15 PM',
    status: 'Contacted',
    adminNotes: 'Director Khaleel Ahmed contacted Anil on 2nd March. Quotation sent via email.'
  },
  {
    id: 'MBRC-2026-0003',
    customerName: 'Mohammed Zameer',
    company: 'Zameer Developers & Logistics',
    mobile: '+91 97400 33412',
    email: 'zameer@logistixbidar.com',
    projectType: 'Earthwork & Site Development',
    projectLocation: 'Humnabad Industrial Area',
    estimatedBudget: '₹ 2.0 Cr – ₹ 3.5 Cr',
    expectedStartDate: '2026-03-25',
    preferredContactMethod: 'WhatsApp',
    message: 'Looking for turnkey site grading, hard rock blasting, and 45,000 m³ murrum filling for an 18-acre logistics park.',
    uploadedFiles: [
      { id: 'f-3', name: 'Site_Contour_Plan_DWG.pdf', size: '4.8 MB', type: 'application/pdf' }
    ],
    date: '2026-02-26 11:30 AM',
    status: 'In Progress',
    adminNotes: 'Site survey completed by Ejaz Ahmed. Mobilizing grader and single drum roller next Monday.'
  },
  {
    id: 'MBRC-2026-0004',
    customerName: 'Suresh Reddy',
    company: 'Reddy Earthcon Consortium',
    mobile: '+91 98860 77123',
    email: 'suresh@reddyearthcon.in',
    projectType: 'Road Construction & Development',
    projectLocation: 'Basavakalyan Bypass Package II',
    estimatedBudget: '₹ 6.0 Cr – ₹ 9.0 Cr',
    expectedStartDate: '2026-06-01',
    preferredContactMethod: 'Phone',
    message: 'Requesting quotation for 8.5 km granular sub-base (GSB) and 100mm wet mix macadam (WMM) laying with sensor grader.',
    uploadedFiles: [],
    date: '2026-02-20 04:10 PM',
    status: 'Quotation Sent',
    adminNotes: 'Official BOQ quotation forwarded on 22nd Feb.'
  },
  {
    id: 'MBRC-2026-0005',
    customerName: 'Dr. Mallikarjun Swamy',
    company: 'Swamy Agro Industries & Sugar Mills',
    mobile: '+91 94481 55678',
    email: 'agro.projects@swamysugar.com',
    projectType: 'Road Improvement',
    projectLocation: 'Hallikhed Sugar Complex Heavy Corridor',
    estimatedBudget: '₹ 2.8 Cr – ₹ 3.6 Cr',
    expectedStartDate: '2026-04-10',
    preferredContactMethod: 'Phone',
    message: 'Contract awarded for strengthening 4.2 km heavy sugarcane transport corridor with 75mm DBM and 40mm BC wearing course. Mobilization required by April 10.',
    uploadedFiles: [
      { id: 'f-5', name: 'Work_Order_SwamySugar_2026.pdf', size: '2.1 MB', type: 'application/pdf' }
    ],
    date: '2026-03-05 09:30 AM',
    status: 'Won',
    adminNotes: 'Work order signed and initial mobilization advance received. Equipment scheduled for mobilization.'
  },
  {
    id: 'MBRC-2026-0006',
    customerName: 'Raghavendra Joshi',
    company: 'KSSIDC Industrial Estate Board',
    mobile: '+91 98230 44556',
    email: 'joshi.ee@kssidc-bidar.gov.in',
    projectType: 'Drainage & Concrete Works',
    projectLocation: 'Auto-Cluster Industrial Zone, Bidar',
    estimatedBudget: '₹ 4.2 Cr – ₹ 5.8 Cr',
    expectedStartDate: '2026-04-20',
    preferredContactMethod: 'Email',
    message: 'Turnkey execution needed for 3.1 km internal asphalt pavement alongside precast RCC storm water box drains and kerb stone edging for the upcoming MSME manufacturing park.',
    uploadedFiles: [
      { id: 'f-6', name: 'KSSIDC_Tender_Notice_NIT-14.pdf', size: '5.2 MB', type: 'application/pdf' }
    ],
    date: '2026-03-06 03:20 PM',
    status: 'New',
    adminNotes: 'NIT published. Technical bid submission scheduled for 25th March.'
  },
  {
    id: 'MBRC-2026-0007',
    customerName: 'Venkatesh Naidu',
    company: 'Megha Rail & Intermodal Logistics Ltd',
    mobile: '+91 99000 88991',
    email: 'naidu.v@meghalogistics.in',
    projectType: 'Highway Infrastructure',
    projectLocation: 'Dry Port Intermodal Terminal, Humnabad',
    estimatedBudget: '₹ 11.5 Cr – ₹ 15.0 Cr',
    expectedStartDate: '2026-05-15',
    preferredContactMethod: 'Phone',
    message: 'Seeking EPC contractor / subcontractor for 6.8 km dedicated heavy axle freight connectivity corridor connecting NH-65 with new container terminal. Includes 2 major culverts and high-volume earthwork.',
    uploadedFiles: [
      { id: 'f-7', name: 'NH65_Feeder_Corridor_Alignment.dwg', size: '7.8 MB', type: 'application/octet-stream' }
    ],
    date: '2026-03-07 11:15 AM',
    status: 'In Progress',
    adminNotes: 'Joint reconnaissance survey conducted with Megha Rail engineering team on 8th March.'
  },
  {
    id: 'MBRC-2026-0008',
    customerName: 'Jagadish Biradar',
    company: 'Biradar Urban Infrastructure',
    mobile: '+91 97412 66789',
    email: 'jagadish@biradarinfra.co.in',
    projectType: 'Resurfacing & M-Sand Supply',
    projectLocation: 'Bhalki Town Outer Ring Road',
    estimatedBudget: '₹ 3.2 Cr – ₹ 4.5 Cr',
    expectedStartDate: '2026-04-01',
    preferredContactMethod: 'WhatsApp',
    message: 'Quotation requested for 18,000 MT washed VSI M-sand and 5.5 km micro-surfacing and bituminous overlay on worn PWD municipal bypass corridor.',
    uploadedFiles: [],
    date: '2026-03-08 04:45 PM',
    status: 'Quotation Sent',
    adminNotes: 'Quotation sent via email and WhatsApp. Follow-up scheduled for Monday.'
  }
];

export const projectExecutionSteps = [
  {
    step: '01',
    title: 'Planning & Site Reconnaissance',
    desc: 'Topographical surveying, soil geotechnical analysis, hydrological mapping, traffic volume counts, and detailed corridor alignment.'
  },
  {
    step: '02',
    title: 'Mobilisation & Plant Synchronization',
    desc: 'Deployment of heavy machinery, site camp setup, aggregate stockpiling at captive crusher, and batching plant calibration.'
  },
  {
    step: '03',
    title: 'Ground Engineering & Earthwork',
    desc: 'Mass excavation, cut-and-fill balancing, murrum subgrade compaction, proof-rolling, and culvert cross-drainage foundations.'
  },
  {
    step: '04',
    title: 'Captive Material Quality Control',
    desc: 'Precision batching at captive plants, electronic sieve checks, bitumen viscosity verification, and continuous temperature tracking.'
  },
  {
    step: '05',
    title: 'Safety Enforcement & Traffic Management',
    desc: 'Comprehensive road safety barriers, flaggers, night reflective signage, worker PPE discipline, and zero-accident protocols.'
  },
  {
    step: '06',
    title: 'Precision Paving & Continuous Monitoring',
    desc: 'Sensor paver laying of asphalt/concrete, automated nuclear density compaction tests, core extraction, and profile smoothness testing.'
  },
  {
    step: '07',
    title: 'Completion, Testing & Handover',
    desc: 'Thermoplastic road marking, road furniture installation, formal joint measurement with client engineers, and guarantee certification.'
  }
];