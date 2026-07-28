/* ============================================================
   TFDrills — Seed / Demo Data
   Replace with real API data when a backend is connected.
   ============================================================ */

const STATION_NUMBERS = [3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 23, 24, 25];
const STATIONS = STATION_NUMBERS.map(n => "Station " + n);

const SHIFTS = ["A Shift", "B Shift", "C Shift"];

let _id = 1;
const nid = () => "d" + (_id++);

/* ---------------- FIRE DRILLS ---------------- */
const FIRE_DRILLS = [
  {
    id: nid(), category: "fire", subcategory: "Engine Operations",
    name: "First-Due Engine Deployment", difficulty: "Intermediate", crewSize: "4",
    equipment: ["Engine", "200' 1¾\" preconnect", "Nozzle", "Full PPE", "SCBA"],
    estTime: "8-10 min",
    objectives: ["Position apparatus for effective attack", "Deploy and charge first line", "Establish water supply"],
    steps: [
      "Officer performs 360 size-up and calls conditions.",
      "Driver positions engine, sets brake, engages pump.",
      "Crew pulls and stretches preconnect to the door.",
      "Nozzle firefighter calls for water, bleeds air, advances line.",
      "Engineer establishes supply from hydrant within 3 minutes of arrival."
    ],
    standard: "Line charged and crew at the door within 90 seconds of stretch; supply established within 3 minutes."
  },
  {
    id: nid(), category: "fire", subcategory: "Truck Operations",
    name: "Aerial Ladder Throw & Climb", difficulty: "Intermediate", crewSize: "2",
    equipment: ["Truck company apparatus", "Full PPE", "Tool of choice"],
    estTime: "6 min",
    objectives: ["Position apparatus", "Raise, extend, and set aerial to target", "Safely climb and descend with tool"],
    steps: [
      "Position and level apparatus, set outriggers.",
      "Raise, rotate, and extend ladder to target window/roof.",
      "Firefighter climbs with assigned tool, calls 'ladder secure'.",
      "Perform simulated task at tip, descend under control."
    ],
    standard: "Ladder set and firefighter at tip within 3 minutes of apparatus stop."
  },
  {
    id: nid(), category: "fire", subcategory: "Rescue",
    name: "Vehicle Extrication — Door Removal", difficulty: "Advanced", crewSize: "4",
    equipment: ["Hydraulic spreader/cutter", "Struts", "Hard protection", "Full PPE"],
    estTime: "12-15 min",
    objectives: ["Stabilize vehicle", "Remove door for patient access", "Maintain patient care throughout"],
    steps: [
      "Stabilize vehicle with cribbing/struts, chock wheels.",
      "Assign patient contact firefighter before tools start.",
      "Create purchase point, remove door using spreader/cutter.",
      "Pad and clear sharp edges, confirm space is patient-ready."
    ],
    standard: "Door removed and space cleared within 10 minutes; patient contact never interrupted."
  },
  {
    id: nid(), category: "fire", subcategory: "Search",
    name: "Primary Search — Zero Visibility", difficulty: "Advanced", crewSize: "2",
    equipment: ["Full PPE", "SCBA", "TIC (optional)", "Search rope (optional)"],
    estTime: "5-8 min per room",
    objectives: ["Complete right- or left-hand primary search of assigned area", "Locate and remove victim(s)", "Maintain crew integrity"],
    steps: [
      "Announce entry and search assignment on the radio.",
      "Maintain wall contact, search systematically room to room.",
      "Locate victim (mannequin), confirm responsiveness, package for removal.",
      "Announce 'primary search complete' with results."
    ],
    standard: "Room searched and victim located within 3 minutes of entry; crew never separated."
  },
  {
    id: nid(), category: "fire", subcategory: "Ventilation",
    name: "Vertical Roof Ventilation", difficulty: "Advanced", crewSize: "2",
    equipment: ["Roof ladder", "Chainsaw or axe", "Full PPE", "SCBA"],
    estTime: "8 min",
    objectives: ["Safely access roof", "Cut and open a 4'x4' ventilation hole", "Clear ceiling below"],
    steps: [
      "Sound roof before stepping off ladder, identify rafters.",
      "Cut inspection hole to confirm conditions below.",
      "Cut 4'x4' hole following rafter lines, remove decking.",
      "Push ceiling material down, retreat to ladder."
    ],
    standard: "Hole opened and crew off the roof within 8 minutes of access."
  },
  {
    id: nid(), category: "fire", subcategory: "Water Supply",
    name: "Hydrant to Engine Supply Line", difficulty: "Beginner", crewSize: "2",
    equipment: ["Engine", "Supply hose", "Hydrant wrench", "Gate valve"],
    estTime: "3-5 min",
    objectives: ["Wrap hydrant and charge supply line under 3 minutes"],
    steps: [
      "Firefighter dismounts with hose, wraps hydrant, signals driver.",
      "Driver lays line to the scene, calls 'stop' at position.",
      "Firefighter connects to hydrant, charges on officer's command.",
      "Confirm sustained positive pressure at the pump."
    ],
    standard: "Supply line charged within 3 minutes of engine stopping at hydrant."
  },
  {
    id: nid(), category: "fire", subcategory: "Hose Advancement",
    name: "The Denver Drill", difficulty: "Advanced", crewSize: "3",
    equipment: ["200' 1¾\" line", "Full PPE", "SCBA", "Obstacle props (stairs/furniture optional)"],
    estTime: "4-6 min",
    objectives: ["Advance a charged line up stairs and through obstacles to a target"],
    steps: [
      "Line stretched and charged at base of stairs.",
      "Crew advances up stairs, flaking line to prevent kinks.",
      "Navigate obstacle course/tight turns to simulated fire room.",
      "Knock down target from proper stance within time standard."
    ],
    standard: "Target extinguished from stretch in under 4:30 (crew personal-best tracked for challenges)."
  },
  {
    id: nid(), category: "fire", subcategory: "Forcible Entry",
    name: "Irons Through the Door Prop", difficulty: "Intermediate", crewSize: "2",
    equipment: ["Halligan", "Flathead axe", "Door forcible entry prop", "Full PPE"],
    estTime: "3-5 min",
    objectives: ["Force an inward-opening door using conventional method"],
    steps: [
      "Size up door, identify swing and lock type.",
      "Set the halligan above/below lock, adjust angle.",
      "Strike to set, then pry to gap and control the door.",
      "Announce 'door forced,' maintain control on entry."
    ],
    standard: "Door forced within 90 seconds of first strike."
  },
  {
    id: nid(), category: "fire", subcategory: "Ladders",
    name: "Ground Ladder Throw — 24' Extension", difficulty: "Beginner", crewSize: "2",
    equipment: ["24' extension ladder", "Full PPE"],
    estTime: "2-3 min",
    objectives: ["Remove, carry, raise, and secure ladder to a second-floor window"],
    steps: [
      "Two-firefighter carry from apparatus to building.",
      "Foot and raise ladder using proper technique.",
      "Extend to target, bed halyard, set at climbing angle.",
      "Heel ladder and confirm secure before climb."
    ],
    standard: "Ladder set and secured at proper angle within 90 seconds."
  },
  {
    id: nid(), category: "fire", subcategory: "Pump Operations",
    name: "Pressure Governor & Relay Pumping", difficulty: "Advanced", crewSize: "1",
    equipment: ["Engine/pump panel", "Supply/discharge lines"],
    estTime: "10 min",
    objectives: ["Establish and maintain correct discharge pressures across multiple lines"],
    steps: [
      "Engage pump, confirm water source, set primer if drafting.",
      "Open discharges sequentially, set correct PDP for each line.",
      "Monitor and adjust governor as lines open/close.",
      "Demonstrate relay handoff to a second engine."
    ],
    standard: "Correct pressures (+/- 10 psi) maintained on all lines throughout evolution."
  },
  {
    id: nid(), category: "fire", subcategory: "SCBA",
    name: "SCBA Confidence Course & Mask Confidence", difficulty: "Intermediate", crewSize: "1",
    equipment: ["Full PPE", "SCBA", "Confidence maze prop"],
    estTime: "5-7 min",
    objectives: ["Complete maze under air while managing entanglement and low-profile obstacles"],
    steps: [
      "Don full PPE and SCBA, confirm air and alarm check.",
      "Enter maze, manage wire/entanglement hazard using reduced-profile technique.",
      "Navigate low-clearance obstacle.",
      "Exit maze and confirm remaining air supply."
    ],
    standard: "Course completed without mask removal or entanglement panic; air check logged."
  },
  {
    id: nid(), category: "fire", subcategory: "RIT",
    name: "RIT — Downed Firefighter Removal", difficulty: "Advanced", crewSize: "4",
    equipment: ["Full PPE", "SCBA", "RIT bag", "Webbing/rescue harness"],
    estTime: "10-12 min",
    objectives: ["Locate downed firefighter, convert air, package and remove"],
    steps: [
      "RIT deployed on Mayday transmission, enters with RIT bag.",
      "Locate downed firefighter, control airway/regulator first.",
      "Convert to RIT air supply, package with webbing/drag device.",
      "Remove to point of safety, maintaining air throughout."
    ],
    standard: "Firefighter located and air converted within 3 minutes of RIT entry; removal within 10 minutes total."
  },
  {
    id: nid(), category: "fire", subcategory: "Mayday",
    name: "Mayday Transmission & Self-Rescue", difficulty: "Advanced", crewSize: "1",
    equipment: ["Full PPE", "SCBA", "Radio"],
    estTime: "3-5 min",
    objectives: ["Recognize emergency, transmit proper Mayday, execute self-rescue technique"],
    steps: [
      "Recognize entanglement/entrapment/low-air emergency.",
      "Transmit Mayday using LUNAR format.",
      "Activate PASS device, attempt self-extrication.",
      "Execute emergency egress or wall breach if trained/equipped."
    ],
    standard: "Mayday transmitted within 10 seconds of recognized emergency; LUNAR complete and accurate."
  },
  {
    id: nid(), category: "fire", subcategory: "Officer Scenarios",
    name: "Tabletop: Single-Family Residential Fire", difficulty: "Intermediate", crewSize: "1",
    equipment: ["Scenario cards/whiteboard"],
    estTime: "15 min",
    objectives: ["Size up scenario, give initial radio report, assign first-arriving companies"],
    steps: [
      "Review scenario photo/description (smoke showing, occupants reported).",
      "Deliver a complete initial radio report.",
      "Assign tasks to first-due engine, truck, and second-due units.",
      "Adjust strategy as scenario conditions change (evaluator injects)."
    ],
    standard: "Complete, correct initial report given within 30 seconds; sound strategy maintained through injects."
  }
];

/* ---------------- EMS DRILLS ---------------- */
const EMS_DRILLS = [
  {
    id: nid(), category: "ems", subcategory: "Cardiac",
    name: "High-Performance CPR & AED", difficulty: "Intermediate", crewSize: "4",
    equipment: ["Mannequin", "AED trainer", "BVM"],
    estTime: "6-8 min",
    objectives: ["Deliver high-performance CPR with minimal interruptions and correct pit-crew rotation"],
    steps: [
      "First responder confirms unresponsive/no pulse, begins compressions.",
      "Second rescuer applies AED, analyzes, shocks if advised.",
      "Rotate compressors every 2 minutes without pausing >5 seconds.",
      "Integrate airway management and IV/IO access without interrupting compressions."
    ],
    standard: "Chest compression fraction ≥ 80%; rotations under 5-second pause."
  },
  {
    id: nid(), category: "ems", subcategory: "Airway",
    name: "Advanced Airway — Supraglottic & Confirmation", difficulty: "Advanced", crewSize: "2",
    equipment: ["Airway mannequin", "SGA device", "Capnography", "BVM"],
    estTime: "5 min",
    objectives: ["Place supraglottic airway and confirm placement with waveform capnography"],
    steps: [
      "Preoxygenate patient with BVM.",
      "Select and insert appropriately sized SGA device.",
      "Confirm placement with capnography waveform and breath sounds.",
      "Secure device and reassess after any patient movement."
    ],
    standard: "Airway placed and confirmed within 2 attempts / 60 seconds each."
  },
  {
    id: nid(), category: "ems", subcategory: "Trauma",
    name: "Tourniquet & Hemorrhage Control", difficulty: "Beginner", crewSize: "1",
    equipment: ["Trauma mannequin/limb", "CAT tourniquet", "Hemostatic gauze"],
    estTime: "2 min",
    objectives: ["Control life-threatening hemorrhage within 60 seconds"],
    steps: [
      "Identify life threat, expose injury.",
      "Apply tourniquet 2-3 inches above wound, high and tight.",
      "Tighten until bleeding stops and pulse is eliminated distally.",
      "Note time of application, reassess."
    ],
    standard: "Bleeding controlled within 60 seconds of hands-on patient."
  },
  {
    id: nid(), category: "ems", subcategory: "Medical",
    name: "Stroke Recognition & Transport Decision", difficulty: "Intermediate", crewSize: "2",
    equipment: ["Scenario mannequin/actor", "Cincinnati stroke scale card", "Glucometer"],
    estTime: "8 min",
    objectives: ["Correctly identify stroke signs, determine last known well, choose destination"],
    steps: [
      "Perform Cincinnati Prehospital Stroke Scale.",
      "Check blood glucose to rule out hypoglycemia.",
      "Determine exact last known well time from bystanders.",
      "Make correct stroke-center transport decision and pre-notify."
    ],
    standard: "Complete stroke assessment and correct destination decision within 8 minutes on scene."
  },
  {
    id: nid(), category: "ems", subcategory: "Pediatrics",
    name: "Pediatric Respiratory Distress", difficulty: "Advanced", crewSize: "2",
    equipment: ["Pediatric mannequin", "Broselow tape", "BVM (pediatric)"],
    estTime: "6 min",
    objectives: ["Correctly size equipment and manage pediatric airway/breathing emergency"],
    steps: [
      "Use Broselow tape for weight-based sizing.",
      "Perform pediatric assessment triangle.",
      "Manage airway/breathing with appropriately sized equipment.",
      "Calculate and confirm correct medication dosing if indicated."
    ],
    standard: "Correct sizing and dosing on first attempt; no equipment mismatch errors."
  },
  {
    id: nid(), category: "ems", subcategory: "OB",
    name: "Emergency Field Delivery", difficulty: "Advanced", crewSize: "2",
    equipment: ["OB mannequin/kit", "OB delivery kit"],
    estTime: "10 min",
    objectives: ["Manage an imminent field delivery and initial newborn care"],
    steps: [
      "Assess for crowning and imminent delivery.",
      "Prepare OB kit, position mother, support delivery.",
      "Clear airway, dry/stimulate/warm newborn, assess APGAR.",
      "Deliver placenta, monitor for postpartum hemorrhage."
    ],
    standard: "Newborn assessed and warmed within 60 seconds of delivery; APGAR documented at 1 and 5 min."
  },
  {
    id: nid(), category: "ems", subcategory: "Pharmacology",
    name: "Medication Dosage & Push Rate Drill", difficulty: "Intermediate", crewSize: "1",
    equipment: ["Med cards/scenario sheets", "Practice syringes (no needles)"],
    estTime: "10 min",
    objectives: ["Correctly calculate weight-based dosing and demonstrate proper administration rate"],
    steps: [
      "Read scenario vitals and patient weight.",
      "Calculate correct dose/volume for indicated medication.",
      "State the 5 rights aloud before administration.",
      "Demonstrate correct push rate/dilution where applicable."
    ],
    standard: "Zero dosage calculation errors across all scenario cards."
  },
  {
    id: nid(), category: "ems", subcategory: "Equipment Checks",
    name: "Full Rig & Airway Bag Inventory", difficulty: "Beginner", crewSize: "1",
    equipment: ["Ambulance/rig", "Checklist"],
    estTime: "15 min",
    objectives: ["Complete full inventory and function check of medical equipment/supplies"],
    steps: [
      "Check monitor/defib battery and pads expiration.",
      "Verify airway bag contents against checklist.",
      "Confirm O2 tank levels and function.",
      "Log and report any deficiencies for restock."
    ],
    standard: "Checklist 100% complete with all deficiencies logged."
  },
  {
    id: nid(), category: "ems", subcategory: "Mega Codes",
    name: "Full Cardiac Arrest Mega Code", difficulty: "Advanced", crewSize: "4",
    equipment: ["Mannequin", "AED/monitor trainer", "Full ALS bag"],
    estTime: "15-20 min",
    objectives: ["Run a complete ACLS cardiac arrest scenario with correct algorithm and team roles"],
    steps: [
      "Assign team leader, compressor, airway, and medication roles.",
      "Run rhythm checks and shocks per algorithm.",
      "Administer correct medications at correct intervals.",
      "Debrief roles, timing, and communication after the code."
    ],
    standard: "Algorithm followed correctly with no missed rhythm check or medication interval."
  },
  {
    id: nid(), category: "ems", subcategory: "Mass Casualty",
    name: "START Triage — Multi-Patient Scenario", difficulty: "Advanced", crewSize: "4",
    equipment: ["Triage tags", "Multiple mannequins/role players"],
    estTime: "20 min",
    objectives: ["Correctly triage 6-10 patients using START methodology under time pressure"],
    steps: [
      "Announce MCI and request appropriate resources.",
      "Begin systematic START triage, tagging each patient.",
      "Communicate patient count/category to incident command.",
      "Coordinate transport priority based on triage results."
    ],
    standard: "All patients triaged and tagged within 15 minutes; no mis-triage of red-tag patients."
  }
];

/* ---------------- FITNESS WORKOUTS ---------------- */
const FITNESS_WORKOUTS = [
  {
    id: nid(), category: "fitness", subcategory: "Strength",
    name: "Firefighter Push/Pull Strength", difficulty: "Intermediate", crewSize: "1+",
    equipment: ["Barbell or dumbbells", "Pull-up bar"],
    estTime: "45 min",
    objectives: ["Build the push/pull/carry strength used in forcible entry and victim drags"],
    steps: ["5 x 5 bench or push press", "5 x 5 weighted pull-ups or rows", "3 x 10 farmer carries (heavy)", "3 x 12 sled push or push-ups to finish"],
    standard: "Complete all sets at prescribed load with good form.",
    why: "Directly builds the pushing/pulling power needed for forcible entry, hose advancement, and hauling equipment."
  },
  {
    id: nid(), category: "fitness", subcategory: "Functional Firefighter",
    name: "Stair Climb & Hose Drag Circuit", difficulty: "Advanced", crewSize: "1+",
    equipment: ["Stairwell or step platform", "Hose bundle or sandbag", "SCBA (optional)"],
    estTime: "30 min",
    objectives: ["Simulate high-rise operations under load"],
    steps: ["5 rounds: 3 flights stair climb with hose bundle", "20 sandbag get-ups", "30-sec plank hold", "2 min rest between rounds"],
    standard: "Complete 5 rounds maintaining consistent pace round to round.",
    why: "Mirrors the combined cardiovascular and load-bearing demand of high-rise or wildland operations."
  },
  {
    id: nid(), category: "fitness", subcategory: "Cardio",
    name: "SCBA-Pace Interval Run", difficulty: "Intermediate", crewSize: "1+",
    equipment: ["Track or treadmill"],
    estTime: "25 min",
    objectives: ["Build the aerobic base needed for sustained work-rest cycles on air"],
    steps: ["5 min warm-up jog", "6 x 400m at hard pace, 90-sec walk rest", "5 min cool-down"],
    standard: "Hold intervals within 5 seconds of each other across all 6 reps.",
    why: "Aerobic capacity extends air time and speeds recovery between rehab cycles."
  },
  {
    id: nid(), category: "fitness", subcategory: "HIIT",
    name: "Mayday Response HIIT", difficulty: "Advanced", crewSize: "1+",
    equipment: ["Kettlebell", "Jump rope or box"],
    estTime: "20 min",
    objectives: ["Train the short, maximal-effort bursts required in a Mayday or rescue event"],
    steps: ["8 rounds: 20 sec kettlebell swings, 10 sec rest", "8 rounds: 20 sec burpees, 10 sec rest", "8 rounds: 20 sec box jumps, 10 sec rest"],
    standard: "Maintain max effort every round; note any drop-off round to round.",
    why: "Builds the anaerobic power needed for sudden, all-out rescue efforts."
  },
  {
    id: nid(), category: "fitness", subcategory: "Endurance",
    name: "Wildland Ruck", difficulty: "Intermediate", crewSize: "1+",
    equipment: ["Weighted ruck/pack (25-45 lb)", "Trail or road route"],
    estTime: "60 min",
    objectives: ["Build the muscular and cardiovascular endurance for extended wildland/EMS shifts"],
    steps: ["60-minute ruck at a sustainable pace on varied terrain", "Maintain upright posture and steady breathing throughout"],
    standard: "Complete distance without stopping; track pace over time for progression.",
    why: "Builds durable, low-impact endurance that carries over to long incidents and mutual aid deployments."
  },
  {
    id: nid(), category: "fitness", subcategory: "Mobility",
    name: "Turnout Gear Mobility Flow", difficulty: "Beginner", crewSize: "1+",
    equipment: ["None"],
    estTime: "15 min",
    objectives: ["Restore hip, shoulder, and thoracic mobility restricted by PPE and apparatus seating"],
    steps: ["World's greatest stretch x 5/side", "Thoracic rotations x 10/side", "90/90 hip switches x 10/side", "Shoulder dislocates with band x 15"],
    standard: "Move through full flow with controlled breathing, no rushing.",
    why: "Keeps joints healthy despite hours in bunker gear and tight apparatus cabs."
  },
  {
    id: nid(), category: "fitness", subcategory: "No Equipment",
    name: "Bodyweight Station Workout", difficulty: "Beginner", crewSize: "1+",
    equipment: ["None"],
    estTime: "20 min",
    objectives: ["Maintain conditioning with zero equipment, ideal for station bays"],
    steps: ["4 rounds: 20 push-ups, 20 air squats, 20 sit-ups, 10 burpees", "Rest 1 min between rounds"],
    standard: "Complete all 4 rounds under 20 minutes total.",
    why: "No-excuse workout that keeps a crew ready even with zero gear on hand."
  },
  {
    id: nid(), category: "fitness", subcategory: "Recovery",
    name: "Post-Incident Recovery Session", difficulty: "Beginner", crewSize: "1+",
    equipment: ["Foam roller (optional)"],
    estTime: "15 min",
    objectives: ["Aid recovery and reduce injury risk after a physically demanding call or shift"],
    steps: ["5 min easy walk to bring heart rate down", "Foam roll major muscle groups, 1 min each", "5 min static stretching, focus on hips/back/shoulders"],
    standard: "Full session completed within 2 hours of strenuous activity.",
    why: "Active recovery reduces soreness and cumulative injury risk across a career."
  }
];

const ALL_DRILLS = [...FIRE_DRILLS, ...EMS_DRILLS, ...FITNESS_WORKOUTS];

/* ---------------- BADGES ---------------- */
const BADGES = [
  { id: "hose-beast", name: "Hose Beast", desc: "Complete 10 hose advancement drills.", icon: "🧯" },
  { id: "ems-guru", name: "EMS Guru", desc: "Complete 10 EMS drills.", icon: "🩺" },
  { id: "search-master", name: "Search Master", desc: "Complete 10 search drills.", icon: "🔦" },
  { id: "ladder-king", name: "Ladder King", desc: "Complete 10 ladder drills.", icon: "🪜" },
  { id: "pump-wizard", name: "Pump Wizard", desc: "Complete 10 pump operations drills.", icon: "🚰" },
  { id: "airway-ace", name: "Airway Ace", desc: "Complete 10 airway drills.", icon: "💨" },
  { id: "rit-ready", name: "RIT Ready", desc: "Complete 5 RIT drills.", icon: "🛟" },
  { id: "iron-crew", name: "Iron Crew", desc: "Complete 5 crew fitness workouts together.", icon: "💪" },
  { id: "consistency", name: "Consistency Award", desc: "Log drills 4 weeks in a row.", icon: "📆" },
  { id: "streak-30", name: "30-Day Streak", desc: "Train 30 days in a row.", icon: "🔥" },
  { id: "dept-champion", name: "Department Champion", desc: "Reach #1 on the Overall Challenge Board.", icon: "🏆" }
];

/* ---------------- MOCK CREW LEADERBOARD ---------------- */
const CREWS = [
  { station: "Station 17", shift: "A Shift", wins: 14, losses: 3, streak: 5, rank: 1, videos: 22, badges: ["hose-beast","iron-crew","streak-30"] },
  { station: "Station 4", shift: "B Shift", wins: 12, losses: 4, streak: 2, rank: 2, videos: 18, badges: ["ems-guru","consistency"] },
  { station: "Station 5", shift: "C Shift", wins: 11, losses: 6, streak: 0, rank: 3, videos: 15, badges: ["search-master"] },
  { station: "Station 12", shift: "A Shift", wins: 10, losses: 5, streak: 3, rank: 4, videos: 14, badges: ["pump-wizard"] },
  { station: "Station 3", shift: "B Shift", wins: 9, losses: 7, streak: 5, rank: 5, videos: 11, badges: ["iron-crew"] },
  { station: "Station 7", shift: "A Shift", wins: 8, losses: 5, streak: 1, rank: 6, videos: 9, badges: ["iron-crew"] },
  { station: "Station 25", shift: "C Shift", wins: 7, losses: 8, streak: 0, rank: 7, videos: 8, badges: [] },
  { station: "Station 9", shift: "C Shift", wins: 6, losses: 9, streak: 0, rank: 8, videos: 6, badges: [] }
];

/* ---------------- MOCK ACTIVITY FEED ---------------- */
const ACTIVITY_FEED = [
  { text: "Station 4 B Shift completed Denver Drill in 4:11.", time: "12 min ago" },
  { text: "Station 5 C Shift accepted Station 17 A Shift's challenge.", time: "38 min ago" },
  { text: "Station 12 A Shift set a new Hose Advancement record.", time: "1 hr ago" },
  { text: "Station 7 A Shift earned the Iron Crew badge.", time: "3 hr ago" },
  { text: "Station 3 B Shift has won five straight challenges.", time: "5 hr ago" },
  { text: "Station 17 A Shift completed High-Performance CPR & AED.", time: "yesterday" },
  { text: "Station 9 C Shift logged a Wildland Ruck workout.", time: "yesterday" }
];

/* ---------------- MOCK VIDEO LIBRARY ---------------- */
const VIDEOS = [
  { id: "v1", drill: "The Denver Drill", station: "Station 17", shift: "A Shift", time: "4:18", views: 142, rating: 4.8 },
  { id: "v2", drill: "The Denver Drill", station: "Station 4", shift: "B Shift", time: "4:11", views: 98, rating: 4.9 },
  { id: "v3", drill: "Vehicle Extrication — Door Removal", station: "Station 5", shift: "C Shift", time: "9:42", views: 61, rating: 4.5 },
  { id: "v4", drill: "High-Performance CPR & AED", station: "Station 17", shift: "A Shift", time: "n/a", views: 205, rating: 4.9 },
  { id: "v5", drill: "RIT — Downed Firefighter Removal", station: "Station 12", shift: "A Shift", time: "8:55", views: 77, rating: 4.7 },
  { id: "v6", drill: "Aerial Ladder Throw & Climb", station: "Station 3", shift: "B Shift", time: "2:48", views: 54, rating: 4.4 }
];

/* ---------------- WEEKLY MISSIONS TEMPLATE ---------------- */
const WEEKLY_MISSION_TEMPLATE = [
  { id: "m1", label: "Complete 3 Fire Drills", target: 3, category: "fire" },
  { id: "m2", label: "Complete 2 EMS Drills", target: 2, category: "ems" },
  { id: "m3", label: "Complete 1 Crew Workout", target: 1, category: "fitness" }
];
