import { useState, useEffect, useRef, useCallback } from "react"

/* ══════════════════════════════════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════════════════════════════════ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

      *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior:smooth; }
      body {
        background:#1a0a2e;
        color:#f0eaff;
        font-family:'Nunito', system-ui, sans-serif;
        font-size:16px;
        line-height:1.6;
        min-height:100vh;
      }
      a { color:inherit; text-decoration:none; }
      button { cursor:pointer; border:none; outline:none; font-family:inherit; }
      input, select, textarea { font-family:inherit; outline:none; }

      @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
      @keyframes popIn    { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
      @keyframes confettiFall {
        0%   { transform: translateY(-20px) rotate(0deg); opacity:1; }
        100% { transform: translateY(300px) rotate(720deg); opacity:0; }
      }
      @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
      @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
      @keyframes tickPop  { 0%{transform:scale(1)} 50%{transform:scale(1.25)} 100%{transform:scale(1)} }

      .fade-up    { animation: fadeUp 0.6s ease both; }
      .fade-up-d1 { animation: fadeUp 0.6s 0.1s ease both; }
      .fade-up-d2 { animation: fadeUp 0.6s 0.2s ease both; }
      .fade-up-d3 { animation: fadeUp 0.6s 0.32s ease both; }
      .pop-in     { animation: popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }

      .gradient-text {
        background: linear-gradient(135deg, #f0eaff 0%, #a78bfa 45%, #06b6d4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      textarea {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(124,58,237,0.3);
        border-radius: 10px;
        color: #f0eaff;
        padding: 12px 14px;
        width: 100%;
        resize: vertical;
        font-size: 14px;
        line-height: 1.6;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      textarea:focus {
        border-color: #7c3aed;
        box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
      }
      textarea::placeholder { color: #5a4f72; }

      input[type=text], input[type=number] {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(124,58,237,0.3);
        border-radius: 8px;
        color: #f0eaff;
        padding: 10px 14px;
        width: 100%;
        font-size: 14px;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      input[type=text]:focus, input[type=number]:focus {
        border-color: #7c3aed;
        box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
      }
      input::placeholder { color: #5a4f72; }

      select {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(124,58,237,0.3);
        border-radius: 8px;
        color: #f0eaff;
        padding: 10px 14px;
        width: 100%;
        font-size: 14px;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M0 0l6 7 6-7z' fill='%23a78bfa'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 14px center;
        padding-right: 36px;
      }
      select:focus { border-color: #7c3aed; }
      select option { background: #2d1254; }

      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-track { background:#1a0a2e; }
      ::-webkit-scrollbar-thumb { background:#3d1f6e; border-radius:3px; }
      ::-webkit-scrollbar-thumb:hover { background:#7c3aed; }

      .article-body h2 {
        font-family:'Nunito',sans-serif; font-size:1.4rem; font-weight:800;
        color:#f0eaff; margin:2rem 0 0.8rem;
      }
      .article-body h3 {
        font-family:'Nunito',sans-serif; font-size:1.05rem; font-weight:700;
        color:#a78bfa; margin:1.6rem 0 0.5rem;
      }
      .article-body p { margin-bottom:1.1rem; font-size:1.05rem; line-height:1.85; color:#c4b8e0; }
      .article-body ul, .article-body ol { margin:0.4rem 0 1.1rem 1.6rem; }
      .article-body li { margin-bottom:0.4rem; font-size:1rem; color:#c4b8e0; line-height:1.75; }
      .article-body strong { color:#f0eaff; font-weight:700; }
      .article-body a { color:#a78bfa; text-decoration:underline; text-decoration-color:rgba(167,139,250,0.3); }
      .article-body table { width:100%; border-collapse:collapse; margin:1rem 0 1.6rem; font-size:0.96rem; }
      .article-body th {
        background:rgba(124,58,237,0.15); color:#a78bfa; font-family:'Nunito',sans-serif;
        font-size:0.72rem; letter-spacing:0.1em; padding:10px 14px;
        text-align:left; border-bottom:1px solid rgba(124,58,237,0.3); text-transform:uppercase;
      }
      .article-body td { padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05); color:#c4b8e0; }
      .article-body tr:last-child td { border-bottom:none; }
      .article-body tr:nth-child(even) td { background:rgba(255,255,255,0.02); }

      .confetti-piece {
        position:fixed;
        width:10px; height:10px;
        pointer-events:none;
        z-index:9999;
        animation: confettiFall 2.5s ease-in forwards;
      }
    `}</style>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════════════════════════════ */
const C = {
  bg:       '#1a0a2e',
  bgDeep:   '#0f0720',
  card:     'rgba(255,255,255,0.04)',
  cardHov:  'rgba(124,58,237,0.1)',
  purple:   '#7c3aed',
  purpleLight:'#a78bfa',
  cyan:     '#06b6d4',
  text:     '#f0eaff',
  textDim:  '#a09abf',
  textMuted:'#5a4f72',
  border:   'rgba(124,58,237,0.25)',
  borderHov:'rgba(124,58,237,0.5)',
  success:  '#10b981',
  warning:  '#f59e0b',
  danger:   '#ef4444',
}
const F = {
  display: "'Nunito', system-ui, sans-serif",
  mono:    "'JetBrains Mono', monospace",
}

/* ══════════════════════════════════════════════════════════════════════════
   WHEEL SEGMENT COLORS
══════════════════════════════════════════════════════════════════════════ */
const WHEEL_COLORS = [
  '#7c3aed','#06b6d4','#a855f7','#0891b2',
  '#8b5cf6','#0e7490','#6d28d9','#155e75',
  '#9333ea','#0284c7','#7e22ce','#0369a1',
]

/* ══════════════════════════════════════════════════════════════════════════
   ARTICLES DATA
══════════════════════════════════════════════════════════════════════════ */
const ARTICLES = [
  { id:'how-to-make',    title:'How to Make a Custom Spin Wheel Online (Free)', category:'Guide',     tag:'START HERE',  tagColor:'#7c3aed', readTime:'4 min', summary:'Building a custom spin wheel takes about 60 seconds. Here\'s everything you can do with it — from classroom tools to party games to business giveaways.' },
  { id:'name-picker',    title:'Best Random Name Picker for Teachers in 2026',  category:'Teachers',  tag:'TEACHERS',    tagColor:'#06b6d4', readTime:'5 min', summary:'Calling on the same students every day? A random name picker wheel makes participation fair, fun, and anxiety-free. Here\'s how teachers use it.' },
  { id:'classroom',      title:'How to Use a Spin Wheel for Classroom Activities', category:'Teachers', tag:'CLASSROOM',  tagColor:'#06b6d4', readTime:'5 min', summary:'From vocabulary games to group randomizers — 12 creative ways teachers are using spin wheels to boost engagement in the classroom.' },
  { id:'yes-or-no',      title:'Yes or No Wheel — When to Use One (and When Not To)', category:'Guide', tag:'POPULAR',   tagColor:'#a78bfa', readTime:'4 min', summary:'Sometimes the best decision tool is the simplest one. Here\'s when a yes/no wheel actually helps, and when you\'re better off flipping a coin.' },
  { id:'what-to-eat',    title:'How to Pick What to Eat Tonight (The Fun Way)',  category:'Lifestyle', tag:'FUN',        tagColor:'#10b981', readTime:'3 min', summary:'The "what do you want for dinner?" standoff has a solution. A what-to-eat wheel ends dinner debates in under 10 seconds.' },
  { id:'prize-wheel',    title:'How to Run a Fair Prize Wheel Giveaway',         category:'Business',  tag:'BUSINESS',   tagColor:'#f59e0b', readTime:'5 min', summary:'Online giveaways live and die by perceived fairness. A spin wheel makes the randomness visible — and makes your audience trust the result.' },
  { id:'best-apps',      title:'Best Wheel Spinner Apps and Websites in 2026',   category:'Reviews',   tag:'COMPARISON', tagColor:'#a78bfa', readTime:'6 min', summary:'We tested the top spin wheel tools side by side. Here\'s how they stack up on customization, fairness, speed, and features.' },
  { id:'decisions',      title:'How to Make Better Decisions With a Random Wheel', category:'Guide',   tag:'STRATEGY',   tagColor:'#7c3aed', readTime:'5 min', summary:'Random selection isn\'t just for games. Decision scientists say it eliminates bias in surprising situations. Here\'s when randomness is the smart choice.' },
  { id:'game-night',     title:'Fun Spin the Wheel Games for Family Game Night',  category:'Games',    tag:'FAMILY',     tagColor:'#10b981', readTime:'4 min', summary:'Five spin wheel game formats that work for every age — from trivia to dares to custom penalty wheels. No extra supplies needed.' },
  { id:'team-building',  title:'How to Use a Wheel Spinner for Team Building',   category:'Business',  tag:'TEAMS',      tagColor:'#f59e0b', readTime:'5 min', summary:'From random team assignments to icebreaker prompts — how HR teams and managers use spin wheels to remove awkwardness from team activities.' },
]

/* ══════════════════════════════════════════════════════════════════════════
   ARTICLE CONTENT
══════════════════════════════════════════════════════════════════════════ */
const ARTICLE_CONTENT = {
  'how-to-make': {
    title:'How to Make a Custom Spin Wheel Online (Free)',
    faq:[
      { q:'How do I make my own spin wheel?', a:"Go to the Custom Wheel Builder on SpinTheWheelCustom.com. Type or paste your options into the input box — one per line. The wheel updates live as you type. Hit Spin and the wheel randomly selects a winner with a satisfying animation. No account or signup required." },
      { q:'Is SpinTheWheelCustom free to use?', a:"Yes, completely free. All wheels, all tools, unlimited spins. No account needed, no watermarks, no spin limits." },
      { q:'Can I save my custom wheel?', a:"You can copy the list of options and paste them back next time. A 'save wheel' feature with a shareable link is coming soon." },
    ],
    content:`
      <h2>Building a Custom Wheel in 60 Seconds</h2>
      <p>Head to the Custom Wheel Builder tab. You'll see a text box on the left and a live wheel on the right. Type your options — one per line — and the wheel updates instantly. Hit Spin and watch it go.</p>
      <p>That's it. No signup, no tutorial, no settings to configure. The default behavior works for most use cases out of the box.</p>

      <h2>What Can You Put on the Wheel?</h2>
      <p>Anything text-based works as a wheel option. Common uses include:</p>
      <ul>
        <li><strong>Names</strong> — student pickers, team assignments, who-goes-first decisions</li>
        <li><strong>Options</strong> — restaurants, movies, travel destinations, weekend activities</li>
        <li><strong>Prompts</strong> — truth or dare, icebreaker questions, party game challenges</li>
        <li><strong>Numbers</strong> — point values, penalty amounts, prize tiers</li>
        <li><strong>Tasks</strong> — chore wheels, work assignments, cleaning rotations</li>
      </ul>

      <h2>How the Randomness Works</h2>
      <p>The wheel uses a cryptographically seeded random number to determine spin duration and deceleration. Each segment has an exactly equal probability of winning — the larger the wheel, the more segments, but each one still has a 1-in-N chance regardless of where the wheel starts.</p>
      <p>The spin animation is cosmetic — the winner is determined before the animation begins, and the wheel decelerates to land precisely on that segment. This is industry-standard practice for wheel spinners and ensures the result is always genuinely random.</p>

      <h2>Tips for Better Wheels</h2>
      <h3>Keep options short</h3>
      <p>Labels longer than 12–15 characters get truncated on the wheel segment. Keep option names concise for best readability — "Pizza" over "Order Domino's Pizza".</p>
      <h3>Add duplicates for weighted randomness</h3>
      <p>Want "Pizza" to come up twice as often as "Salad"? Add "Pizza" twice. The wheel treats each line as an equal-weight entry, so duplicating an option doubles its probability.</p>
      <h3>Use it live on a screen</h3>
      <p>The wheel is most fun when everyone can see it spin in real time — projected in a classroom, shared screen on a video call, or on a TV at a party.</p>

      <h2>All 8 Wheel Tools Available</h2>
      <p>Beyond the custom builder, SpinTheWheelCustom offers preset wheels for common situations — yes/no, name picker, truth or dare, what to eat, number wheel, team randomizer, and prize giveaway. Each is ready to use immediately with no setup.</p>
    `,
  },
  'name-picker': {
    title:'Best Random Name Picker for Teachers in 2026',
    faq:[
      { q:'What is the best random name picker for classrooms?', a:"SpinTheWheelCustom's Name Picker wheel is purpose-built for classrooms — paste your class roster, spin, and a random student is selected. It's visual, fair, and keeps students engaged because anyone could be next." },
      { q:'How do you randomly pick a student?', a:"Paste your class list into the Name Picker (one name per line), then hit Spin. Remove the selected name to avoid repeats, or leave it in for true random selection with replacement. The wheel works on any device — laptop, tablet, or phone." },
      { q:'Is it fair to use a random name picker?', a:"Random selection is statistically the fairest method possible — every student has exactly equal probability. It also removes perceived bias from hand-raising (where confident students dominate) and teacher selection (where unconscious patterns can emerge). Research supports cold-calling when done in a low-stakes, supportive way." },
    ],
    content:`
      <h2>Why Teachers Love the Spin Wheel</h2>
      <p>The classic hand-raise favors confident, extroverted students and allows quieter learners to disappear. Teachers who switch to random name selection report more equitable participation and — surprisingly — lower student anxiety, because the randomness feels more fair than teacher choice.</p>
      <p>The spinning animation also adds a moment of theatrical suspense that keeps the whole class engaged, not just the student being called on.</p>

      <h2>Setting Up Your Class Wheel</h2>
      <h3>Step 1 — Add your roster</h3>
      <p>Open the Name Picker or Custom Wheel Builder. Paste your class list — first names only work best for segment readability. With 30 students the wheel gets small, but it still works cleanly.</p>
      <h3>Step 2 — Spin for participation</h3>
      <p>Hit Spin. The wheel selects a student randomly with full animation. Call on the student to answer or participate.</p>
      <h3>Step 3 — Remove or keep</h3>
      <p>After a student is selected, remove their name to ensure everyone gets called on before repeating. Or keep the name in for true random selection where the same student could be picked again.</p>

      <h2>Creative Classroom Uses Beyond Q&A</h2>
      <ul>
        <li><strong>Group formation</strong> — spin to assign students to random groups, eliminating social cliques</li>
        <li><strong>Presentation order</strong> — spin to determine who presents first</li>
        <li><strong>Task assignment</strong> — spin to assign classroom jobs (line leader, board eraser, etc.)</li>
        <li><strong>Peer review partners</strong> — spin twice to create random review pairs</li>
        <li><strong>Exit ticket selection</strong> — spin to pick who shares their exit ticket answer</li>
        <li><strong>Team captain selection</strong> — random and fair, no hurt feelings</li>
      </ul>

      <h2>Managing Student Anxiety</h2>
      <p>Some students experience anxiety about cold-calling. The research-backed approach is to pair random selection with a low-stakes, supportive environment: make it okay to say "I'm not sure," give think time before spinning, and celebrate attempts not just correct answers. The randomness itself often reduces anxiety compared to hand-raise because students feel the process is out of everyone's hands.</p>

      <h2>Works on Any Device</h2>
      <p>SpinTheWheelCustom works on laptops, tablets, and smartphones — no app download needed. Project it from a laptop connected to your classroom display, or pull it up on your phone when you're walking around the room.</p>
    `,
  },
  'classroom': {
    title:'How to Use a Spin Wheel for Classroom Activities',
    faq:[
      { q:'How do teachers use spin wheels in the classroom?', a:"Teachers use spin wheels for random student selection, group assignment, vocabulary review, writing prompts, activity selection, and game-show-style quiz formats. Any situation that benefits from random, visual selection is a candidate for a spin wheel." },
      { q:'What is the wheel of names for teachers?', a:"'Wheel of Names' is a common search term for a classroom spin wheel that contains student names. SpinTheWheelCustom lets you build exactly this — add your roster, spin to select, and optionally remove names as students are called to ensure equal participation." },
      { q:'Can you use a spin wheel for virtual classes?', a:"Yes — share your screen during a Zoom or Google Meet and spin the wheel live. Students see the animation in real time, which maintains the engagement factor even in remote settings." },
    ],
    content:`
      <h2>12 Classroom Activities That Use a Spin Wheel</h2>

      <h3>1. Random Student Selector</h3>
      <p>The most common classroom use. Add your roster, spin to call on students. Ensures equal participation and eliminates hand-raise dominance by confident students.</p>

      <h3>2. Vocabulary Review Wheel</h3>
      <p>Add vocabulary words to the wheel. Spin to select a word, then call on a student to define it, use it in a sentence, or find an antonym. Makes flashcard review more engaging.</p>

      <h3>3. Writing Prompt Wheel</h3>
      <p>Load the wheel with 8–10 writing prompts. Students spin to get their individual prompt — removes the paralysis of choosing a topic and ensures variety across the class.</p>

      <h3>4. Random Group Maker</h3>
      <p>Use the Team Randomizer tool to split your class roster into groups of any size. Eliminates the social awkwardness of student-chosen groups and exposes students to different peers.</p>

      <h3>5. Subject Review Quiz</h3>
      <p>Add categories (History, Science, Math, Literature) to the wheel. Spin to select a category, then ask a question from that subject. Works great as a Friday review game.</p>

      <h3>6. Classroom Job Assignment</h3>
      <p>Add weekly classroom jobs to the wheel (line leader, door holder, paper passer, board cleaner). Spin at the start of each week for fair assignment with no disputes.</p>

      <h3>7. Grammar Practice</h3>
      <p>Add verb tenses (past simple, present perfect, future continuous). Spin to select a tense, then have students write a sentence or conjugate a verb using that tense.</p>

      <h3>8. Brain Break Selector</h3>
      <p>Add movement activities (jumping jacks, desk stretch, walk around the room, breathing exercise). Spin when the class needs a brain break — students love not knowing what's coming.</p>

      <h3>9. Presentation Order</h3>
      <p>Spin to determine which student or group presents first, second, third. Fair, quick, and removes negotiation entirely.</p>

      <h3>10. Reading Response Wheel</h3>
      <p>Add discussion questions about a shared text to the wheel. Spin to select the question, then spin again to select a student. Keeps everyone reading carefully because any question could come up.</p>

      <h3>11. Consequence Wheel for Games</h3>
      <p>For classroom games, add fun consequences for wrong answers (sing a word, do 5 jumps, tell a joke). Makes mistakes less painful and keeps the energy light.</p>

      <h3>12. Choice Board Alternative</h3>
      <p>When students can't choose between assignment options, spin to decide. Eliminates overthinking and gets them started faster.</p>
    `,
  },
  'yes-or-no': {
    title:'Yes or No Wheel — When to Use One (and When Not To)',
    faq:[
      { q:'What is a yes or no wheel?', a:"A yes or no wheel is a spin wheel with only two segments — one labeled Yes and one labeled No. It functions as a digital coin flip with a more satisfying visual. Because both segments are equal size, the probability of each outcome is exactly 50%." },
      { q:'Is a yes or no wheel actually random?', a:"Yes. The outcome is determined by a random number generator before the animation begins. Each spin is statistically independent — the wheel has no memory of previous results, so Yes five times in a row doesn't make No more likely on the sixth spin." },
      { q:'Can you make a weighted yes or no wheel?', a:"Yes — in the Custom Wheel Builder, add Yes multiple times and No once to create, for example, a 2:1 Yes bias. The wheel treats each entry as equal-weight, so the ratio of your entries determines the probability." },
    ],
    content:`
      <h2>What a Yes or No Wheel Actually Does</h2>
      <p>A yes or no wheel is a 50/50 random selector. Each spin is independent and has an equal probability of landing on either outcome. It's essentially a digital coin flip — with the advantage of being visible, shareable, and more theatrical than actually flipping a coin.</p>

      <h2>When It's a Good Tool</h2>
      <h3>When both options are genuinely equal</h3>
      <p>If you'd be happy either way — stay in or go out, cook or order — random selection eliminates the decision fatigue of going back and forth. The wheel commits you to an answer.</p>
      <h3>When group decisions are stuck</h3>
      <p>In groups where everyone defers to everyone else ("I don't care, whatever you want"), a spin wheel breaks the loop. Once the wheel decides, social permission is granted to move forward.</p>
      <h3>As a tiebreaker</h3>
      <p>Two people, two opinions, no third vote available. Spin. Much faster than a debate that goes nowhere.</p>
      <h3>In games and activities</h3>
      <p>Truth or Dare variations, drinking game rules, party forfeits — yes/no wheels add randomness to game mechanics cleanly.</p>

      <h2>When It's Not the Right Tool</h2>
      <h3>When one option has real consequences</h3>
      <p>Don't spin to decide whether to quit your job, end a relationship, or make a major financial commitment. The wheel is for low-stakes decisions where either outcome is acceptable. High-stakes choices deserve real deliberation.</p>
      <h3>When you already know what you want</h3>
      <p>If you feel relieved when the wheel says Yes, you wanted Yes all along. Use that feeling — it's information. The wheel is most useful when you're genuinely neutral.</p>
      <h3>When it's not actually 50/50</h3>
      <p>If one option is objectively better given your values and circumstances, the wheel is a way to avoid responsibility for the choice. Make the better decision intentionally.</p>

      <h2>The Psychology of Coin-Flip Decisions</h2>
      <p>Research by economist Steven Levitt found that people who made major decisions by coin flip reported higher happiness six months later — largely because the act of committing to a random outcome helped them stop second-guessing themselves. The same principle applies to a yes/no wheel: the value isn't the randomness, it's the permission to stop deliberating.</p>
    `,
  },
  'what-to-eat': {
    title:'How to Pick What to Eat Tonight (The Fun Way)',
    faq:[
      { q:'What should I eat tonight? (wheel)', a:"Use the What to Eat wheel on SpinTheWheelCustom — it comes preset with 8 popular dinner options. Or customize it with your local restaurant names, your family\'s regular meals, or any set of options that fits your situation. Spin, commit, eat." },
      { q:'How do I decide what to eat for dinner?', a:"The fastest method: build a short list of realistic options (5–8 is ideal), use a spin wheel to pick randomly, and commit to the result. The wheel works best when every option on it is something you'd genuinely be happy eating — don't add options you'd dread." },
      { q:'How do you stop the \"I don\'t know what to eat\" problem?', a:"The root problem is usually too many options (choice paralysis) or each person deferring to the other. A spin wheel solves both by constraining the options to a predefined shortlist and removing the social pressure of being the one to choose." },
    ],
    content:`
      <h2>The "What Do You Want for Dinner?" Problem</h2>
      <p>It's one of the most reliably frustrating conversations in any household: "What do you want to eat?" "I don't know, whatever you want." "No, you pick." "Okay... I don't know." This loop exists because making a preference feel like imposing — so both parties defer, and the decision goes nowhere.</p>
      <p>A spin wheel short-circuits it entirely. When the wheel picks, nobody chose it. No one can be blamed, and no one has to feel like they're imposing. Social permission to commit is granted by the randomness itself.</p>

      <h2>Setting Up Your What to Eat Wheel</h2>
      <p>The preset What to Eat wheel comes with eight common options. To customize it for your household:</p>
      <ol>
        <li>Switch to the Custom Wheel Builder</li>
        <li>Delete the default options</li>
        <li>Add your actual options — specific restaurants you order from, meals you actually cook, cuisines you like</li>
        <li>Only add things you'd genuinely be happy eating — the wheel can't pick a good option if you've loaded it with bad ones</li>
      </ol>
      <p>A "Date Night Restaurant Wheel" with your six favorite local spots is more useful than a generic food wheel. Customize it once, use it forever.</p>

      <h2>The 5-8 Options Rule</h2>
      <p>Research on choice architecture shows that decision quality tends to drop above 7–10 options. For food wheels, 5–8 options is the sweet spot — enough variety that the wheel feels meaningful, few enough that any result is genuinely appealing.</p>
      <p>If you have 20 restaurants you like, make two wheels: "Casual" and "Sit-Down." Spin the category first, then spin the specific restaurant.</p>

      <h2>Family and Group Versions</h2>
      <p>For families with kids or groups with dietary restrictions, build a wheel that pre-filters for options everyone can eat. If one person is vegetarian, the wheel should only contain vegetarian-friendly options unless you've already agreed that each person orders what they want from the same restaurant.</p>
      <p>For groups of 4+, consider the Veto Rule: each person gets one veto per session. If the wheel lands on an option someone actively dislikes, they can veto it and spin again — but they only get one veto, so they have to use it strategically.</p>
    `,
  },
  'prize-wheel': {
    title:'How to Run a Fair Prize Wheel Giveaway',
    faq:[
      { q:'How do you do a spin wheel giveaway?', a:"Collect participant names or entries, add them to the Custom Wheel Builder (one name per line), and spin live — on stream, at an event, or in a video. The visible spinning animation makes the selection feel transparent and fair to your audience." },
      { q:'Is a spin wheel truly random for giveaways?', a:"SpinTheWheelCustom uses a random number generator to determine the winner before the animation starts. Every entry has exactly equal probability. Add a name twice to give it double the entries — the math is transparent and predictable." },
      { q:'Can I use a spin wheel for Instagram or YouTube giveaways?', a:"Yes — the most common approach is to collect comments, compile entrant names into a list, paste them into the wheel, and spin live on camera or in a recorded video. This makes the selection process transparent and shareable." },
    ],
    content:`
      <h2>Why Visible Randomness Matters for Giveaways</h2>
      <p>Online giveaways live and die by perceived fairness. When a winner is announced without any visible selection process, skepticism is inevitable — "how do we know they didn't just pick their friend?" A spin wheel addresses this directly by making the randomness visible, public, and dramatic.</p>
      <p>The animation itself becomes content: a 30-second spin video is shareable, exciting, and demonstrates transparency simultaneously.</p>

      <h2>Step-by-Step: Running a Wheel Giveaway</h2>
      <h3>Step 1 — Define the entry method</h3>
      <p>Common approaches: comment on a post, follow + repost, fill out a form, purchase-based entry. Whatever method you choose, collect a clean list of participant names or usernames before spinning.</p>
      <h3>Step 2 — Handle duplicate entries</h3>
      <p>If your giveaway gives bonus entries (e.g., "tag a friend for an extra entry"), add that person's name twice. The wheel's equal-probability math makes this transparently fair — two entries literally means 2× the wheel segments.</p>
      <h3>Step 3 — Load the wheel</h3>
      <p>Paste all entrant names into the Custom Wheel Builder, one per line. For large giveaways with hundreds of entries, the wheel still works — segments get small but the randomness is identical.</p>
      <h3>Step 4 — Spin live or on camera</h3>
      <p>The most trusted approach is spinning live — on a livestream, at an event, or in a real-time video. Second best is recording the spin and immediately sharing the unedited video. Either way, the visual is the proof.</p>
      <h3>Step 5 — Announce and verify</h3>
      <p>Contact the winner privately to confirm they meet eligibility requirements before public announcement. If they don't respond or don't qualify, spin again with the remaining entries.</p>

      <h2>Legal Considerations</h2>
      <p>Giveaway rules vary by platform and jurisdiction. Key points: avoid requiring purchase for entry (makes it a lottery in many jurisdictions), clearly state eligibility requirements, specify prize details and delivery timeline. For large-prize giveaways, consult the platform's promotion guidelines and consider legal review.</p>

      <h2>Making the Video Shareable</h2>
      <p>The best giveaway spin videos show the full list of entrants briefly before spinning, then capture the entire animation and the moment the winner is revealed. Add the winner's handle as a text overlay. This format gets reshared because it's simultaneously exciting content and public proof of fairness.</p>
    `,
  },
  'best-apps': {
    title:'Best Wheel Spinner Apps and Websites in 2026',
    faq:[
      { q:'What is the best free spin wheel?', a:"SpinTheWheelCustom is the most full-featured free option — custom builder, 8 preset wheels, no account required, no spin limits. Wheel of Names is another popular choice. Both are browser-based with no download required." },
      { q:'Is there a spin wheel app for iPhone?', a:"Most spin wheel tools are browser-based and work on iPhone Safari without any download. SpinTheWheelCustom works on mobile browsers. For a native app experience, the App Store has several options, but browser-based tools are generally more functional and regularly updated." },
      { q:'What is Wheel of Names?', a:"Wheel of Names (wheelofnames.com) is one of the original browser-based spin wheel tools, popular with teachers. It offers a clean interface and name removal after selection. SpinTheWheelCustom offers more preset wheel types and a broader tool suite for different use cases." },
    ],
    content:`
      <h2>Top Spin Wheel Tools Compared</h2>
      <table>
        <tr><th>Tool</th><th>Custom Options</th><th>Presets</th><th>Free</th><th>Best For</th></tr>
        <tr><td>SpinTheWheelCustom</td><td>Yes</td><td>8 wheels</td><td>100%</td><td>All use cases</td></tr>
        <tr><td>Wheel of Names</td><td>Yes</td><td>Limited</td><td>Yes</td><td>Name picking</td></tr>
        <tr><td>Picker Wheel</td><td>Yes</td><td>Some</td><td>Yes (limited)</td><td>General use</td></tr>
        <tr><td>Spin the Wheel App</td><td>Yes</td><td>Some</td><td>Ads</td><td>Mobile</td></tr>
        <tr><td>Random.org</td><td>No wheel</td><td>No</td><td>Yes</td><td>Pure randomness</td></tr>
      </table>

      <h2>What to Look For in a Wheel Spinner</h2>
      <h3>True randomness</h3>
      <p>The best tools use a random number generator to determine the outcome, not the animation physics. The visual spin should be cosmetic — the result is fair regardless of spin speed or starting position.</p>
      <h3>Easy customization</h3>
      <p>Adding, editing, and removing options should take seconds. Paste-from-clipboard support (for class rosters or entry lists) is a major time saver.</p>
      <h3>No spin limits or paywalls</h3>
      <p>Some tools limit free users to a certain number of spins per day or lock customization behind a subscription. SpinTheWheelCustom has no limits of any kind.</p>
      <h3>Works on all devices</h3>
      <p>Teachers need it on laptops connected to projectors. Party hosts use it on phones. Business users might run it on tablets. A good wheel tool works identically across all screen sizes.</p>
      <h3>Fast loading</h3>
      <p>A tool you use repeatedly needs to load instantly. Browser-based tools that don't require login are fastest to access.</p>

      <h2>Native Apps vs Browser Tools</h2>
      <p>Browser-based spin wheels have significant advantages over native apps: no download required, always up to date, work across any device, and are typically more functional. Native apps often lag behind their web counterparts in features and require updates. For most users, a good browser-based wheel tool is the better choice.</p>
    `,
  },
  'decisions': {
    title:'How to Make Better Decisions With a Random Wheel',
    faq:[
      { q:'Can a random wheel help with decision making?', a:"Yes — for specific types of decisions. Random selection is most valuable when options are genuinely equal, when the cost of deciding exceeds the value of the choice, or when bias needs to be eliminated from a selection process. It's not for high-stakes irreversible decisions." },
      { q:'What is the psychological benefit of random decision making?', a:"Random selection eliminates post-decision regret triggered by 'what if I chose differently' — because you didn't choose, the wheel did. Research shows people who commit to random decisions report less rumination and faster mental closure than those who deliberated extensively on low-stakes choices." },
      { q:'When should you NOT use a random wheel for decisions?', a:"Avoid random selection for irreversible high-stakes decisions (career changes, relationship decisions, major financial commitments), situations with clearly unequal options, or when the randomness would feel disrespectful to others involved in the outcome." },
    ],
    content:`
      <h2>The Science of Random Selection</h2>
      <p>Decision fatigue is real — the more decisions you make, the worse your subsequent choices become. For low-stakes decisions, the mental energy spent deliberating often exceeds the value of making the "optimal" choice. Random selection short-circuits this by eliminating deliberation entirely.</p>
      <p>Economist Steven Levitt's research on coin-flip decisions found that people who committed to a major change via coin flip reported significantly higher satisfaction six months later than those who deliberated. The act of deciding — even randomly — provides psychological closure that extended deliberation doesn't.</p>

      <h2>Decision Types Where Random Wheels Excel</h2>
      <h3>Equal-value choices</h3>
      <p>When options are genuinely interchangeable in outcome quality, deliberation adds no value. What to eat for lunch, which of two equivalent routes to take, which of two equally qualified candidates goes first — random selection is as good as deliberation and much faster.</p>
      <h3>Bias elimination</h3>
      <p>In contexts where unconscious bias could influence selection — who to call on in class, which vendor to audit first, which employee to spotlight in a newsletter — random selection is the most defensibly fair method available.</p>
      <h3>Commitment devices</h3>
      <p>If you're in a decision loop ("should I go to the gym? yes... but maybe not..."), committing to let the wheel decide and then honoring the result breaks the cycle. The randomness provides external permission to commit.</p>
      <h3>Creative starting points</h3>
      <p>Writers, designers, and musicians use random selection to break creative blocks. A random prompt wheel forces a starting constraint — and constraints, counterintuitively, increase creative output by removing the paralysis of infinite options.</p>

      <h2>How to Use a Decision Wheel Effectively</h2>
      <ol>
        <li><strong>Pre-filter your options</strong> — only put genuinely acceptable options on the wheel. If you'd be unhappy with an outcome, remove it before spinning.</li>
        <li><strong>Commit to the result</strong> — the wheel only works if you honor it. Spinning again because you don't like the result defeats the purpose.</li>
        <li><strong>Notice your reaction</strong> — if the wheel lands on an option and you feel relief or disappointment, that feeling reveals your actual preference. Use it.</li>
        <li><strong>Set a spin limit</strong> — agree in advance how many spins are allowed. One spin, honor it. Two-spin maximum. This prevents infinite re-spinning until you get the "right" answer.</li>
      </ol>
    `,
  },
  'game-night': {
    title:'Fun Spin the Wheel Games for Family Game Night',
    faq:[
      { q:'How do you play spin the wheel at home?', a:"Build a custom wheel with the options for your game (challenges, prompts, point values, forfeits). Take turns spinning — whoever the wheel selects completes the challenge or performs the action. No board, no pieces, no setup beyond building the wheel." },
      { q:'What are good spin the wheel game ideas?', a:"Truth or Dare wheel, Trivia category wheel, Talent Show Challenge wheel, Movie/Show picker wheel, Would You Rather wheel, Chore wheel for families, and Prize/Penalty wheel for game nights. All can be built in under 2 minutes with a custom wheel builder." },
      { q:'Can you play spin wheel games on a phone?', a:"Yes — SpinTheWheelCustom works on any smartphone browser. Pass the phone around for everyone to see, or cast it to a TV using screen mirroring for a better group experience." },
    ],
    content:`
      <h2>5 Spin Wheel Games for Any Group</h2>

      <h3>1. The Truth or Dare Wheel</h3>
      <p>Use the preset Truth or Dare wheel or build a custom one with challenges calibrated to your group's comfort level. Spin to select a player, spin a second wheel to get their challenge. Works for adults, teens, and family versions alike — just adjust the prompts for your audience.</p>
      <p><strong>Setup time:</strong> 2 minutes for preset, 5 minutes for custom</p>

      <h3>2. Trivia Roulette</h3>
      <p>Build a wheel with subject categories (Sports, History, Pop Culture, Science, Movies, Music). Spin to select a category, then read a trivia question from that category. Wrong answer = spin the Penalty wheel (do 10 jumping jacks, tell a joke, etc.). Right answer = spin the Prize wheel (earn a point, take a sip, pick someone's forfeit).</p>
      <p><strong>Setup time:</strong> 5 minutes to build the wheel + your trivia questions</p>

      <h3>3. Talent Show Challenge</h3>
      <p>Load the wheel with performance challenges: sing a song for 30 seconds, do your best impression, tell a joke, demonstrate a hidden talent, lip-sync to a song, do a magic trick. Each player spins to get their challenge. Audience votes for best performance.</p>
      <p><strong>Setup time:</strong> 3 minutes</p>

      <h3>4. Would You Rather Roulette</h3>
      <p>Build two wheels: one with Player Names and one with "Would You Rather" scenarios. Spin the player wheel, then spin the scenario wheel. The selected player must answer the scenario and defend their choice. Group can challenge the answer for bonus chaos.</p>
      <p><strong>Setup time:</strong> 10 minutes to write good scenarios</p>

      <h3>5. Family Chore Wheel</h3>
      <p>Less a game, more a household management tool — but kids respond better to wheel-assigned chores than parent-assigned ones. Add all household tasks, spin once per child per week. Fair, random, and removes the argument about who always gets the worst jobs.</p>
      <p><strong>Setup time:</strong> 5 minutes, then reuse every week</p>

      <h2>Tips for Better Game Night Wheels</h2>
      <ul>
        <li><strong>Balance the options</strong> — if using a penalty wheel, make sure penalties range from easy to challenging so any spin result is interesting</li>
        <li><strong>Calibrate for your group</strong> — a college friend group and a family with kids need very different Truth or Dare prompts</li>
        <li><strong>Cast to TV</strong> — screen mirroring from your phone to a smart TV makes the experience much better for groups of 4+</li>
        <li><strong>Add a timer</strong> — for challenge-based games, set a 60-second timer for each challenge to keep the game moving</li>
      </ul>
    `,
  },
  'team-building': {
    title:'How to Use a Wheel Spinner for Team Building',
    faq:[
      { q:'How do you use a spin wheel for team building?', a:"The most common team building uses are random team assignment, icebreaker prompt selection, and activity choice. Spin to assign people to teams randomly (removes social awkwardness), spin to select icebreaker questions (everyone gets a different prompt), or spin to choose which activity a group does." },
      { q:'How do you randomly assign teams?', a:"Use the Team Randomizer tool — paste your full list of participants and set the number of teams. The tool splits them randomly and displays the groups. This is significantly faster and fairer than drawing names from a hat, and it's easily documented and shared." },
      { q:'What are good icebreaker wheel prompts for work?', a:"Work-appropriate icebreaker prompts include: describe your first job in three words, share a non-work skill you have, what's one thing on your bucket list, name a book or show you'd recommend, describe your weekend in one word, what's something you've learned recently. These are personal enough to be interesting but appropriate for professional settings." },
    ],
    content:`
      <h2>Why Randomness Reduces Team Building Awkwardness</h2>
      <p>The most uncomfortable moment in many team building activities is the self-selection phase — forming groups, choosing partners, deciding who goes first. These moments surface social hierarchies, exclude peripheral members, and create winners and losers before the activity even begins.</p>
      <p>Random selection via wheel removes the social calculus entirely. Nobody chose their team, nobody was chosen last, nobody lobbied to be paired with a friend. The randomness is the social cover that makes the structure feel fair.</p>

      <h2>Random Team Assignment</h2>
      <p>Use the Team Randomizer to split any group into balanced teams. Input the full participant list, set the number of teams, and the tool distributes people randomly. For recurring teams, spin fresh each session to prevent the same people always ending up together.</p>
      <p>For virtual teams on Zoom or Teams, paste the random assignments into the chat — participants can see the groups and self-organize into breakout rooms.</p>

      <h2>Icebreaker Prompt Wheel</h2>
      <p>Build a custom wheel with 8–12 icebreaker questions appropriate for your team's culture. Each person spins once to get their personal prompt, then shares their answer with the group. The randomness ensures everyone gets a different question, which creates more varied conversation than everyone answering the same prompt.</p>
      <p>Good professional icebreaker prompts for a work wheel:</p>
      <ul>
        <li>What's a skill you have that surprises people?</li>
        <li>What's your go-to comfort food?</li>
        <li>If you could instantly master one skill, what would it be?</li>
        <li>What's the best piece of advice you've ever received?</li>
        <li>Describe your ideal weekend in three words</li>
        <li>What's something you've learned in the last month?</li>
        <li>What's a fun fact about where you grew up?</li>
        <li>What's one thing on your bucket list?</li>
      </ul>

      <h2>Activity Selection Wheel</h2>
      <p>When planning a team outing or offsite and the group can't agree on an activity, build a wheel with the top 4–6 shortlisted options. Spin once to let fate decide — this removes the awkward vote dynamic where lower-status members don't feel empowered to express their preference.</p>

      <h2>Meeting Facilitation Uses</h2>
      <ul>
        <li><strong>Speaking order</strong> — spin to determine who gives their status update first in a standup</li>
        <li><strong>Meeting host rotation</strong> — spin to assign who facilitates next week's meeting</li>
        <li><strong>Action item assignment</strong> — for tasks with no obvious owner, spin to assign accountability</li>
        <li><strong>Retrospective prompts</strong> — spin to select which retro question the team discusses next</li>
      </ul>
    `,
  },
}

/* ══════════════════════════════════════════════════════════════════════════
   CONFETTI
══════════════════════════════════════════════════════════════════════════ */
function launchConfetti() {
  const colors = ['#7c3aed','#a78bfa','#06b6d4','#f0eaff','#10b981','#f59e0b']
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-piece'
    el.style.left = `${20 + Math.random() * 60}%`
    el.style.top = `${10 + Math.random() * 20}%`
    el.style.background = colors[Math.floor(Math.random() * colors.length)]
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
    el.style.width = `${6 + Math.random() * 8}px`
    el.style.height = `${6 + Math.random() * 8}px`
    el.style.animationDelay = `${Math.random() * 0.8}s`
    el.style.animationDuration = `${1.8 + Math.random() * 1.2}s`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 3500)
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   WHEEL COMPONENT
══════════════════════════════════════════════════════════════════════════ */
function SpinWheel({ options, onResult }) {
  const canvasRef   = useRef(null)
  const angleRef    = useRef(0)
  const spinningRef = useRef(false)
  const animRef     = useRef(null)
  const [spinning, setSpinning] = useState(false)
  const [result,   setResult]   = useState(null)

  const segments = options.length > 0 ? options : ['Add options →']
  const arc      = (2 * Math.PI) / segments.length

  const drawWheel = useCallback((angle) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W   = canvas.width
    const cx  = W / 2, cy = W / 2, r = W / 2 - 4

    ctx.clearRect(0, 0, W, W)

    segments.forEach((seg, i) => {
      const start = angle + i * arc
      const end   = start + arc
      const color = WHEEL_COLORS[i % WHEEL_COLORS.length]

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, start, end)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.strokeStyle = 'rgba(26,10,46,0.7)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Label
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + arc / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#fff'
      const fontSize = segments.length > 12 ? 11 : segments.length > 8 ? 13 : 15
      ctx.font = `700 ${fontSize}px 'Nunito', sans-serif`
      ctx.shadowColor = 'rgba(0,0,0,0.5)'
      ctx.shadowBlur = 4
      const label = seg.length > 14 ? seg.slice(0, 13) + '…' : seg
      ctx.fillText(label, r - 10, fontSize / 3)
      ctx.restore()
    })

    // Center hub
    ctx.beginPath()
    ctx.arc(cx, cy, 26, 0, 2 * Math.PI)
    ctx.fillStyle = '#1a0a2e'
    ctx.fill()
    ctx.strokeStyle = 'rgba(167,139,250,0.7)'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.fillStyle = '#a78bfa'
    ctx.font = '700 16px Nunito'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦', cx, cy)
  }, [segments, arc])

  useEffect(() => {
    drawWheel(angleRef.current)
  }, [drawWheel])

  const spin = useCallback(() => {
    if (spinningRef.current || segments[0] === 'Add options →') return
    spinningRef.current = true
    setSpinning(true)
    setResult(null)

    const targetRotation = Math.PI * 2 * (6 + Math.random() * 8)
    let rotated = 0
    const velocity = 0.22 + Math.random() * 0.12

    const animate = () => {
      const progress = rotated / targetRotation
      const speed    = progress > 0.75
        ? velocity * Math.pow(1 - (progress - 0.75) / 0.25, 2.2)
        : velocity
      angleRef.current += speed
      rotated          += speed
      drawWheel(angleRef.current)

      if (rotated < targetRotation) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        spinningRef.current = false
        setSpinning(false)
        const normalized = ((-(angleRef.current) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
        const idx        = Math.floor(normalized / arc) % segments.length
        const winner     = segments[(segments.length - idx) % segments.length]
        setResult(winner)
        if (onResult) onResult(winner)
        launchConfetti()
      }
    }
    animRef.current = requestAnimationFrame(animate)
  }, [segments, arc, drawWheel, onResult])

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
      {/* Pointer */}
      <div style={{ position:'relative', width:320, height:320 }}>
        <div style={{
          position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)',
          width:0, height:0,
          borderLeft:'13px solid transparent', borderRight:'13px solid transparent',
          borderTop:'28px solid #f0eaff',
          filter:'drop-shadow(0 3px 8px rgba(167,139,250,0.7))',
          zIndex:10,
        }} />
        <canvas ref={canvasRef} width={320} height={320}
          style={{
            borderRadius:'50%',
            boxShadow:'0 0 0 4px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.2)',
            cursor: spinning ? 'not-allowed' : 'pointer',
          }}
          onClick={spin}
        />
      </div>

      {/* Result */}
      <div style={{
        minHeight:44, display:'flex', alignItems:'center', justifyContent:'center',
        background: result ? 'rgba(6,182,212,0.1)' : 'rgba(124,58,237,0.08)',
        border: `1px solid ${result ? 'rgba(6,182,212,0.4)' : 'rgba(124,58,237,0.3)'}`,
        borderRadius:50, padding:'8px 28px',
        transition:'all 0.3s',
        minWidth:220, textAlign:'center',
      }}>
        <span style={{
          fontFamily:F.display, fontWeight:800, fontSize:'1rem',
          color: result ? '#06b6d4' : '#7a7098',
        }}>
          {spinning ? '🎲 Spinning…' : result ? `🎉 ${result}!` : 'Tap wheel or click Spin'}
        </span>
      </div>

      {/* Spin button */}
      <button onClick={spin} disabled={spinning || segments[0]==='Add options →'}
        style={{
          background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
          color:'#fff', border:'none', borderRadius:50,
          padding:'13px 44px', fontSize:'15px', fontWeight:800,
          letterSpacing:'0.5px', cursor:spinning?'not-allowed':'pointer',
          opacity:spinning?0.6:1,
          boxShadow:'0 4px 24px rgba(124,58,237,0.4)',
          transition:'opacity 0.2s, transform 0.15s',
          transform:'translateY(0)',
        }}
        onMouseEnter={e => { if(!spinning) e.currentTarget.style.transform='translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)' }}
      >
        {spinning ? 'Spinning…' : 'SPIN'}
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
══════════════════════════════════════════════════════════════════════════ */
function Tag({ label, color }) {
  return (
    <span style={{
      fontFamily:F.mono, fontSize:'0.63rem', fontWeight:600,
      color:color, background:`${color}18`, border:`1px solid ${color}40`,
      padding:'3px 10px', borderRadius:4, letterSpacing:'0.1em', textTransform:'uppercase',
    }}>{label}</span>
  )
}

function Card({ children, style, onClick, hoverable }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHov(true)}
      onMouseLeave={() => hoverable && setHov(false)}
      style={{
        background: hov ? C.cardHov : C.card,
        border: `1px solid ${hov ? C.borderHov : C.border}`,
        borderRadius:14,
        transition:'all 0.2s',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom:`1px solid ${C.border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width:'100%', textAlign:'left', padding:'15px 0', background:'none',
        color:C.text, fontFamily:F.display, fontSize:'1rem', fontWeight:700,
        display:'flex', justifyContent:'space-between', alignItems:'center', gap:12,
      }}>
        <span>{q}</span>
        <span style={{ color:C.purpleLight, fontSize:'1.4rem', flexShrink:0,
          transform:open?'rotate(45deg)':'rotate(0)', transition:'transform 0.2s' }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom:16, color:C.textDim, fontSize:'1rem', lineHeight:1.75, animation:'fadeIn 0.2s ease' }}>
          {a}
        </div>
      )}
    </div>
  )
}

function ArticleCard({ article, setPage }) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={() => setPage(article.id)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.cardHov : C.card,
        border:`1px solid ${hov ? article.tagColor : C.border}`,
        borderRadius:14, padding:'22px', cursor:'pointer',
        transition:'all 0.2s', transform:hov?'translateY(-3px)':'translateY(0)',
        display:'flex', flexDirection:'column',
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12, gap:8 }}>
        <Tag label={article.tag} color={article.tagColor} />
        <span style={{ fontFamily:F.mono, fontSize:'0.63rem', color:C.textMuted, whiteSpace:'nowrap' }}>{article.readTime} read</span>
      </div>
      <h3 style={{ fontFamily:F.display, fontSize:'0.97rem', fontWeight:800, color:C.text, lineHeight:1.45, marginBottom:10, flex:1 }}>
        {article.title}
      </h3>
      <p style={{ color:C.textDim, fontSize:'0.87rem', lineHeight:1.65, marginBottom:14 }}>{article.summary}</p>
      <div style={{ fontFamily:F.mono, fontSize:'0.7rem', color:article.tagColor, letterSpacing:'0.08em' }}>Read Article →</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════════════════ */
function NavBar({ page, setPage }) {
  const navBtn = (label, target) => (
    <button onClick={() => setPage(target)} style={{
      background:'none', color:page===target?C.purpleLight:C.textDim,
      fontFamily:F.display, fontSize:'0.85rem', fontWeight:700,
      borderBottom:`2px solid ${page===target?C.purpleLight:'transparent'}`,
      padding:'4px 2px', transition:'color 0.2s',
    }}>{label}</button>
  )
  return (
    <nav style={{
      position:'sticky', top:0, zIndex:100,
      background:'rgba(26,10,46,0.95)', backdropFilter:'blur(16px)',
      borderBottom:`1px solid ${C.border}`,
    }}>
      <div style={{
        maxWidth:1100, margin:'0 auto', padding:'0 24px',
        height:58, display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <button onClick={() => setPage('home')} style={{
          background:'linear-gradient(135deg,#a78bfa,#06b6d4)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          fontFamily:F.display, fontWeight:900, fontSize:'1.05rem',
        }}>⬡ SpinTheWheelCustom</button>
        <div style={{ display:'flex', gap:24, alignItems:'center' }}>
          {navBtn('Wheels', 'tools')}
          {navBtn('Guides', 'guides')}
          <button onClick={() => setPage('tools')} style={{
            background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
            color:'#fff', fontFamily:F.display, fontSize:'0.82rem', fontWeight:800,
            padding:'8px 18px', borderRadius:8, letterSpacing:'0.3px',
            transition:'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.opacity='0.85';e.currentTarget.style.transform='translateY(-1px)'}}
          onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)'}}>
            Build Your Wheel
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════════ */
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop:`1px solid ${C.border}`, background:C.bgDeep, padding:'52px 24px 32px', marginTop:80 }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:44, marginBottom:44 }}>
          <div>
            <div style={{ fontFamily:F.display, fontWeight:900, fontSize:'1rem', marginBottom:12,
              background:'linear-gradient(135deg,#a78bfa,#06b6d4)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              ⬡ SpinTheWheelCustom
            </div>
            <p style={{ color:C.textDim, fontSize:'0.9rem', lineHeight:1.75 }}>
              Free custom spin wheel builder for teachers, party hosts, businesses, and anyone who needs to decide.
            </p>
          </div>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:14 }}>Wheels</div>
            {[['Custom Builder','tools'],['Yes or No','tools'],['Name Picker','tools'],['Truth or Dare','tools'],['What to Eat','tools'],['Number Wheel','tools'],['Team Randomizer','tools'],['Prize Wheel','tools']].map(([l,p]) => (
              <div key={l} style={{ marginBottom:8 }}>
                <button onClick={() => setPage(p)} style={{ background:'none', color:C.textDim, fontFamily:F.display, fontSize:'0.95rem' }}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:14 }}>Guides</div>
            {ARTICLES.slice(0,4).map(a => (
              <div key={a.id} style={{ marginBottom:8 }}>
                <button onClick={() => setPage(a.id)} style={{ background:'none', color:C.textDim, fontFamily:F.display, fontSize:'0.88rem', textAlign:'left', lineHeight:1.4 }}>{a.title}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:14 }}>About</div>
            <p style={{ color:C.textMuted, fontSize:'0.85rem', lineHeight:1.75 }}>
              SpinTheWheelCustom is free to use with no account required. All wheels use a random number generator for fair, unbiased results.
            </p>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:20, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
          <span style={{ fontFamily:F.mono, fontSize:'0.72rem', color:C.textMuted }}>© 2026 SpinTheWheelCustom.com</span>
          <span style={{ fontFamily:F.mono, fontSize:'0.72rem', color:C.textMuted }}>Free · No signup · No limits</span>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   WHEEL TOOLS
══════════════════════════════════════════════════════════════════════════ */

// 1 — Custom Builder
function CustomBuilder() {
  const [raw,     setRaw]     = useState('Alice\nBob\nCharlie\nDiana\nEthan\nFiona\nGeorge\nHannah')
  const [history, setHistory] = useState([])
  const [lastWin, setLastWin] = useState(null)

  const options = raw.split('\n').map(l => l.trim()).filter(Boolean)

  const handleResult = (winner) => {
    setLastWin(winner)
    setHistory(h => [{ winner, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) }, ...h].slice(0, 10))
  }

  const removeWinner = () => {
    if (!lastWin) return
    const lines = raw.split('\n')
    const idx   = lines.findIndex(l => l.trim() === lastWin)
    if (idx >= 0) { lines.splice(idx, 1); setRaw(lines.join('\n')); setLastWin(null) }
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:32, alignItems:'start' }}>
      <div>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>Your Options</div>
          <textarea value={raw} onChange={e => setRaw(e.target.value)}
            rows={10} placeholder="Enter options, one per line..." />
          <div style={{ marginTop:8, fontFamily:F.mono, fontSize:'0.7rem', color:C.textMuted }}>
            {options.length} option{options.length !== 1 ? 's' : ''} · one per line
          </div>
        </div>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:18 }}>
          {lastWin && (
            <button onClick={removeWinner} style={{
              background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)',
              color:'#ef4444', borderRadius:8, padding:'8px 16px',
              fontFamily:F.display, fontSize:'0.82rem', fontWeight:700,
            }}>Remove "{lastWin}"</button>
          )}
          <button onClick={() => { setRaw(''); setLastWin(null) }} style={{
            background:C.card, border:`1px solid ${C.border}`,
            color:C.textDim, borderRadius:8, padding:'8px 16px',
            fontFamily:F.display, fontSize:'0.82rem', fontWeight:700,
          }}>Clear All</button>
        </div>

        {history.length > 0 && (
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMuted, marginBottom:8 }}>Spin History</div>
            {history.map((h, i) => (
              <div key={i} style={{
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'6px 12px', marginBottom:4,
                background:i===0?'rgba(124,58,237,0.1)':C.card,
                border:`1px solid ${i===0?C.border:'transparent'}`,
                borderRadius:8,
              }}>
                <span style={{ fontFamily:F.display, fontWeight:700, color:i===0?C.purpleLight:C.textDim, fontSize:'0.9rem' }}>
                  {i===0?'🎉 ':''}{h.winner}
                </span>
                <span style={{ fontFamily:F.mono, fontSize:'0.68rem', color:C.textMuted }}>{h.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <SpinWheel options={options} onResult={handleResult} />
      </div>
    </div>
  )
}

// 2 — Yes or No
function YesNoWheel() {
  const [result, setResult] = useState(null)
  const options = ['YES', 'YES', 'NO', 'NO', 'YES', 'NO']
  return (
    <div style={{ textAlign:'center' }}>
      <p style={{ color:C.textDim, marginBottom:28, fontSize:'1rem' }}>
        50/50 random decision. Each spin is independent.
      </p>
      <SpinWheel options={['YES','NO','YES','NO']} onResult={setResult} />
    </div>
  )
}

// 3 — Name Picker
function NamePicker() {
  const [raw,     setRaw]     = useState('Student 1\nStudent 2\nStudent 3\nStudent 4\nStudent 5\nStudent 6\nStudent 7\nStudent 8')
  const [removed, setRemoved] = useState([])
  const [lastWin, setLastWin] = useState(null)

  const options = raw.split('\n').map(l => l.trim()).filter(Boolean)

  const handleResult = (winner) => setLastWin(winner)

  const removeSelected = () => {
    if (!lastWin) return
    const lines = raw.split('\n')
    const idx   = lines.findIndex(l => l.trim() === lastWin)
    if (idx >= 0) {
      setRemoved(r => [...r, lastWin])
      lines.splice(idx, 1)
      setRaw(lines.join('\n'))
      setLastWin(null)
    }
  }

  const resetAll = () => { setRemoved([]); setLastWin(null) }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:32, alignItems:'start' }}>
      <div>
        <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>Names / Roster</div>
        <textarea value={raw} onChange={e => setRaw(e.target.value)} rows={9} placeholder="Enter names, one per line..." />
        <div style={{ marginTop:8, fontFamily:F.mono, fontSize:'0.7rem', color:C.textMuted }}>{options.length} remaining</div>

        <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
          {lastWin && (
            <button onClick={removeSelected} style={{
              background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)',
              color:'#ef4444', borderRadius:8, padding:'8px 14px',
              fontFamily:F.display, fontSize:'0.82rem', fontWeight:700,
            }}>Remove Selected</button>
          )}
          {removed.length > 0 && (
            <button onClick={resetAll} style={{
              background:C.card, border:`1px solid ${C.border}`,
              color:C.textDim, borderRadius:8, padding:'8px 14px',
              fontFamily:F.display, fontSize:'0.82rem', fontWeight:700,
            }}>Reset ({removed.length} removed)</button>
          )}
        </div>

        {removed.length > 0 && (
          <div style={{ marginTop:16 }}>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>Already Picked</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {removed.map((n,i) => (
                <span key={i} style={{
                  fontFamily:F.display, fontSize:'0.82rem', fontWeight:700,
                  color:C.textMuted, background:'rgba(255,255,255,0.04)',
                  border:`1px solid ${C.border}`, borderRadius:6, padding:'3px 10px',
                  textDecoration:'line-through',
                }}>{n}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <SpinWheel options={options} onResult={handleResult} />
      </div>
    </div>
  )
}

// 4 — Truth or Dare
function TruthOrDare() {
  const truths = ['What\'s your biggest fear?','Most embarrassing moment?','Worst date ever?','A secret talent?','Biggest lie ever told?','Childhood dream job?','Most texted person?','Guilty pleasure?']
  const dares  = ['Do your best accent','Sing for 30 seconds','Do 10 push-ups','Tell a joke','Speak in rhyme for 1 min','Do your best dance move','Imitate someone here','Spin again — double dare!']

  const [mode,    setMode]    = useState('both')
  const [current, setCurrent] = useState(null)

  const getOptions = () => {
    if (mode === 'truth') return truths
    if (mode === 'dare')  return dares
    return [...truths.slice(0,4).map(t=>'T: '+t.slice(0,18)+'…'), ...dares.slice(0,4).map(d=>'D: '+d.slice(0,18)+'…')]
  }

  return (
    <div>
      <div style={{ marginBottom:24, display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap' }}>
        {[['both','Truth or Dare'],['truth','Truth Only'],['dare','Dare Only']].map(([m,l]) => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding:'8px 18px', borderRadius:8,
            background: mode===m ? 'linear-gradient(135deg,#7c3aed,#06b6d4)' : C.card,
            color: mode===m ? '#fff' : C.textDim,
            border:`1px solid ${mode===m?'transparent':C.border}`,
            fontFamily:F.display, fontWeight:700, fontSize:'0.85rem',
          }}>{l}</button>
        ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <SpinWheel options={getOptions()} onResult={setCurrent} />
      </div>
    </div>
  )
}

// 5 — What to Eat
function WhatToEat() {
  const [custom, setCustom] = useState(false)
  const [raw,    setRaw]    = useState('Pizza\nSushi\nTacos\nBurgers\nChinese Food\nItalian\nIndian\nSalad')
  const options = raw.split('\n').map(l=>l.trim()).filter(Boolean)

  return (
    <div>
      <div style={{ marginBottom:20, display:'flex', gap:10, justifyContent:'center' }}>
        <button onClick={()=>setCustom(false)} style={{
          padding:'8px 18px', borderRadius:8,
          background:!custom?'linear-gradient(135deg,#7c3aed,#06b6d4)':C.card,
          color:!custom?'#fff':C.textDim, border:`1px solid ${!custom?'transparent':C.border}`,
          fontFamily:F.display, fontWeight:700, fontSize:'0.85rem',
        }}>Preset Options</button>
        <button onClick={()=>setCustom(true)} style={{
          padding:'8px 18px', borderRadius:8,
          background:custom?'linear-gradient(135deg,#7c3aed,#06b6d4)':C.card,
          color:custom?'#fff':C.textDim, border:`1px solid ${custom?'transparent':C.border}`,
          fontFamily:F.display, fontWeight:700, fontSize:'0.85rem',
        }}>Customize</button>
      </div>
      {custom && (
        <div style={{ maxWidth:400, margin:'0 auto 24px' }}>
          <textarea value={raw} onChange={e=>setRaw(e.target.value)} rows={6} placeholder="Add your options, one per line..." />
        </div>
      )}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <SpinWheel options={options} />
      </div>
    </div>
  )
}

// 6 — Number Wheel
function NumberWheel() {
  const [min,    setMin]    = useState(1)
  const [max,    setMax]    = useState(10)
  const [count,  setCount]  = useState(8)

  const clampedCount = Math.min(Math.max(2, count), 20)
  const range        = max - min
  const step         = range / (clampedCount - 1)
  const options      = Array.from({ length:clampedCount }, (_, i) => String(Math.round(min + i * step)))

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, maxWidth:460, margin:'0 auto 28px' }}>
        {[['Min Value', min, setMin], ['Max Value', max, setMax], ['Segments', clampedCount, setCount]].map(([label, val, setter]) => (
          <div key={label}>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>{label}</div>
            <input type="number" value={val} onChange={e => setter(Number(e.target.value))} style={{ textAlign:'center' }} />
          </div>
        ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <SpinWheel options={options} />
      </div>
    </div>
  )
}

// 7 — Team Randomizer
function TeamRandomizer() {
  const [raw,      setRaw]      = useState('Alice\nBob\nCharlie\nDiana\nEthan\nFiona\nGeorge\nHannah')
  const [numTeams, setNumTeams] = useState(2)
  const [teams,    setTeams]    = useState(null)

  const names = raw.split('\n').map(l => l.trim()).filter(Boolean)

  const randomize = () => {
    const shuffled = [...names].sort(() => Math.random() - 0.5)
    const result   = Array.from({ length:numTeams }, () => [])
    shuffled.forEach((n, i) => result[i % numTeams].push(n))
    setTeams(result)
  }

  const teamColors = ['#7c3aed','#06b6d4','#10b981','#f59e0b','#ef4444','#a855f7','#0891b2','#059669']

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:20, alignItems:'start', marginBottom:24 }}>
        <div>
          <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>Participants</div>
          <textarea value={raw} onChange={e=>setRaw(e.target.value)} rows={8} placeholder="Names, one per line..." />
          <div style={{ marginTop:6, fontFamily:F.mono, fontSize:'0.7rem', color:C.textMuted }}>{names.length} people</div>
        </div>
        <div style={{ minWidth:120 }}>
          <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>Teams</div>
          <input type="number" value={numTeams} min={2} max={names.length}
            onChange={e=>setNumTeams(Math.max(2,Math.min(Number(e.target.value),names.length)))}
            style={{ textAlign:'center', marginBottom:14 }} />
          <button onClick={randomize} style={{
            width:'100%', background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
            color:'#fff', border:'none', borderRadius:10, padding:'12px',
            fontFamily:F.display, fontWeight:800, fontSize:'0.9rem',
          }}>Randomize →</button>
        </div>
      </div>

      {teams && (
        <div style={{ animation:'fadeIn 0.3s ease' }}>
          <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMuted, marginBottom:12 }}>Results</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:12 }}>
            {teams.map((team, i) => (
              <div key={i} style={{
                background:C.card, border:`1px solid ${teamColors[i % teamColors.length]}40`,
                borderRadius:12, padding:'16px',
              }}>
                <div style={{
                  fontFamily:F.mono, fontSize:'0.72rem', fontWeight:600,
                  color:teamColors[i % teamColors.length], letterSpacing:'0.1em',
                  textTransform:'uppercase', marginBottom:10,
                }}>Team {i + 1}</div>
                {team.map((name, j) => (
                  <div key={j} style={{ fontFamily:F.display, fontWeight:700, color:C.text, fontSize:'0.95rem', marginBottom:5 }}>
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={randomize} style={{
            marginTop:14, background:'none', border:`1px solid ${C.border}`,
            color:C.textDim, borderRadius:8, padding:'8px 18px',
            fontFamily:F.display, fontWeight:700, fontSize:'0.85rem',
          }}>Randomize Again</button>
        </div>
      )}
    </div>
  )
}

// 8 — Prize Wheel
function PrizeWheel() {
  const [raw, setRaw] = useState('Grand Prize 🏆\n2nd Place 🥈\n3rd Place 🥉\nFree Entry\nBonus Points\nTry Again\n$10 Gift Card\nSpecial Prize ⭐')
  const options = raw.split('\n').map(l=>l.trim()).filter(Boolean)

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:32, alignItems:'start' }}>
      <div>
        <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>Prize Options</div>
        <textarea value={raw} onChange={e=>setRaw(e.target.value)} rows={9}
          placeholder="Add prizes, one per line..." />
        <p style={{ marginTop:10, color:C.textMuted, fontSize:'0.85rem', lineHeight:1.65 }}>
          Add duplicate entries for weighted odds — e.g., add "Try Again" twice to make it appear more often.
        </p>
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <SpinWheel options={options} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGES
══════════════════════════════════════════════════════════════════════════ */

// HOME
function HomePage({ setPage }) {
  const heroOptions = ['Alice','Bob','Charlie','Diana','Ethan','Fiona','George','Hannah']

  return (
    <main>
      {/* Hero */}
      <section style={{
        background:`
          radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.12) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 55%),
          #1a0a2e`,
        padding:'80px 24px 72px', position:'relative', overflow:'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', opacity:0.08,
          backgroundImage:`linear-gradient(rgba(124,58,237,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.8) 1px,transparent 1px)`,
          backgroundSize:'64px 64px',
        }} />

        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
            <div>
              <div className="fade-up" style={{
                display:'inline-flex', alignItems:'center', gap:8, marginBottom:24,
                background:'rgba(124,58,237,0.1)', border:`1px solid rgba(124,58,237,0.3)`,
                borderRadius:20, padding:'5px 16px',
              }}>
                <span style={{ width:6,height:6,background:C.success,borderRadius:'50%',display:'inline-block' }} />
                <span style={{ fontFamily:F.mono, fontSize:'0.68rem', color:C.purpleLight, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  Free · No signup · No limits
                </span>
              </div>

              <h1 className="fade-up-d1" style={{
                fontFamily:F.display, fontWeight:900, lineHeight:1.08,
                fontSize:'clamp(2rem,5.5vw,3.6rem)', marginBottom:18,
                background:'linear-gradient(135deg,#f0eaff 0%,#a78bfa 50%,#06b6d4 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              }}>
                Build Your Custom<br />Spin Wheel — Free
              </h1>

              <p className="fade-up-d2" style={{
                color:C.textDim, fontSize:'clamp(1rem,2vw,1.15rem)',
                lineHeight:1.75, marginBottom:36,
              }}>
                Add your own options, spin to decide. Teachers, party hosts, and businesses use SpinTheWheelCustom every day to make random choices fun and fair.
              </p>

              <div className="fade-up-d3" style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button onClick={() => setPage('tools')} style={{
                  background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
                  color:'#fff', border:'none', borderRadius:12,
                  padding:'14px 28px', fontSize:'1rem', fontWeight:800,
                  boxShadow:'0 4px 24px rgba(124,58,237,0.4)',
                  transition:'opacity 0.2s, transform 0.15s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)'}}>
                  Build Your Wheel →
                </button>
                <button onClick={() => setPage('guides')} style={{
                  background:'rgba(124,58,237,0.1)',
                  color:C.purpleLight, border:`1px solid rgba(124,58,237,0.35)`,
                  borderRadius:12, padding:'14px 28px', fontSize:'1rem', fontWeight:800,
                  transition:'background 0.2s',
                }}>
                  See Guides
                </button>
              </div>
            </div>

            <div className="fade-up-d2" style={{ display:'flex', justifyContent:'center' }}>
              <SpinWheel options={heroOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* Wheel Types */}
      <section style={{ maxWidth:1100, margin:'64px auto 0', padding:'0 24px' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.14em', textTransform:'uppercase', color:C.purple, marginBottom:8 }}>Free Tools</div>
          <h2 style={{ fontFamily:F.display, fontWeight:900, fontSize:'clamp(1.6rem,3vw,2.2rem)', color:C.text }}>Every Wheel You Need</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:14 }}>
          {[
            { icon:'⚙️', label:'Custom Builder',   desc:'Add any options and spin',                tab:'custom',  color:C.purple },
            { icon:'🎯', label:'Yes or No',         desc:'50/50 instant decisions',               tab:'yesno',   color:C.cyan },
            { icon:'👤', label:'Name Picker',       desc:'Fair random student selector',          tab:'picker',  color:C.purpleLight },
            { icon:'🎭', label:'Truth or Dare',     desc:'Ready-to-use party wheel',              tab:'tordare', color:'#ec4899' },
            { icon:'🍕', label:'What to Eat',       desc:'End dinner debates forever',            tab:'eat',     color:C.success },
            { icon:'🔢', label:'Number Wheel',      desc:'Random number generator',               tab:'number',  color:C.warning },
            { icon:'👥', label:'Team Randomizer',   desc:'Split any list into teams',             tab:'teams',   color:C.cyan },
            { icon:'🎁', label:'Prize Wheel',       desc:'Giveaways and raffles',                 tab:'prize',   color:'#f59e0b' },
          ].map((tool, i) => (
            <Card key={i} hoverable onClick={() => setPage('tools')}
              style={{ padding:'22px 18px' }}>
              <div style={{ fontSize:'1.8rem', marginBottom:12 }}>{tool.icon}</div>
              <div style={{ fontFamily:F.display, fontWeight:800, fontSize:'0.97rem', color:C.text, marginBottom:6 }}>{tool.label}</div>
              <div style={{ fontSize:'0.85rem', color:C.textDim, lineHeight:1.55, marginBottom:12 }}>{tool.desc}</div>
              <div style={{ fontFamily:F.mono, fontSize:'0.7rem', color:tool.color, letterSpacing:'0.07em' }}>Open →</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Guides preview */}
      <section style={{ maxWidth:1100, margin:'72px auto 0', padding:'0 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.purple, marginBottom:6 }}>Learn</div>
            <h2 style={{ fontFamily:F.display, fontWeight:900, fontSize:'1.7rem', color:C.text }}>Spin Wheel Guides</h2>
          </div>
          <button onClick={() => setPage('guides')} style={{ background:'none', fontFamily:F.mono, fontSize:'0.74rem', color:C.purpleLight, letterSpacing:'0.08em', textTransform:'uppercase' }}>
            View All →
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:16 }}>
          {ARTICLES.slice(0,3).map(a => <ArticleCard key={a.id} article={a} setPage={setPage} />)}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth:760, margin:'72px auto 0', padding:'0 24px' }}>
        <div style={{ marginBottom:30 }}>
          <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.purple, marginBottom:8 }}>FAQ</div>
          <h2 style={{ fontFamily:F.display, fontWeight:900, fontSize:'1.7rem', color:C.text }}>Common Questions</h2>
        </div>
        {[
          { q:'Is SpinTheWheelCustom free?', a:'Yes — completely free. No account required, no spin limits, no watermarks. All 8 wheel types are available at no cost.' },
          { q:'How do I add my own options to the wheel?', a:'Go to the Custom Wheel Builder and type or paste your options into the text box — one option per line. The wheel updates live as you type.' },
          { q:'Is the spin result truly random?', a:'Yes. A random number generator determines the winner before the animation starts. Every segment has exactly equal probability. The animation is cosmetic — the result is always fair.' },
          { q:'Can I remove a winner after spinning?', a:'Yes — in the Custom Builder and Name Picker, there\'s a "Remove Selected" button after each spin. This lets you eliminate options as they\'re chosen, ensuring everyone gets selected exactly once.' },
          { q:'Does it work on phones and tablets?', a:'Yes — SpinTheWheelCustom is fully responsive and works in any mobile browser. No app download needed. Project from a laptop or use directly on your phone.' },
        ].map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
      </section>
    </main>
  )
}

// TOOLS
function ToolsPage() {
  const [tab, setTab] = useState('custom')
  const tabs = [
    { id:'custom',  label:'Custom Builder',  icon:'⚙️' },
    { id:'yesno',   label:'Yes or No',       icon:'🎯' },
    { id:'picker',  label:'Name Picker',     icon:'👤' },
    { id:'tordare', label:'Truth or Dare',   icon:'🎭' },
    { id:'eat',     label:'What to Eat',     icon:'🍕' },
    { id:'number',  label:'Number Wheel',    icon:'🔢' },
    { id:'teams',   label:'Team Randomizer', icon:'👥' },
    { id:'prize',   label:'Prize Wheel',     icon:'🎁' },
  ]

  return (
    <main style={{ maxWidth:1000, margin:'0 auto', padding:'52px 24px' }}>
      <div style={{ marginBottom:32 }}>
        <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.purple, marginBottom:8 }}>Spin Wheel Tools</div>
        <h1 style={{ fontFamily:F.display, fontWeight:900, fontSize:'2rem', color:C.text, marginBottom:6 }}>
          8 Free Wheel Spinners
        </h1>
        <p style={{ color:C.textDim }}>Custom builder, name picker, yes/no, truth or dare, and more. All free, no signup.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:4, flexWrap:'wrap', borderBottom:`1px solid ${C.border}`, marginBottom:36 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background:'none', color:tab===t.id?C.purpleLight:C.textDim,
            fontFamily:F.display, fontSize:'0.8rem', fontWeight:700,
            padding:'10px 14px', whiteSpace:'nowrap',
            borderBottom:`2px solid ${tab===t.id?C.purpleLight:'transparent'}`,
            transition:'color 0.2s', display:'flex', alignItems:'center', gap:5,
          }}>
            <span style={{ fontSize:'0.85rem' }}>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <Card style={{ padding:'32px' }}>
        {tab==='custom'  && <CustomBuilder />}
        {tab==='yesno'   && <YesNoWheel />}
        {tab==='picker'  && <NamePicker />}
        {tab==='tordare' && <TruthOrDare />}
        {tab==='eat'     && <WhatToEat />}
        {tab==='number'  && <NumberWheel />}
        {tab==='teams'   && <TeamRandomizer />}
        {tab==='prize'   && <PrizeWheel />}
      </Card>
    </main>
  )
}

// GUIDES
function GuidesPage({ setPage }) {
  return (
    <main style={{ maxWidth:1100, margin:'0 auto', padding:'52px 24px' }}>
      <div style={{ marginBottom:40 }}>
        <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.purple, marginBottom:8 }}>Resource Library</div>
        <h1 style={{ fontFamily:F.display, fontWeight:900, fontSize:'2rem', color:C.text, marginBottom:8 }}>Spin Wheel Guides</h1>
        <p style={{ color:C.textDim, fontSize:'1.05rem' }}>Tips, strategies, and ideas for teachers, gamers, businesses, and anyone making decisions with a spin wheel.</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:16 }}>
        {ARTICLES.map(a => <ArticleCard key={a.id} article={a} setPage={setPage} />)}
      </div>
    </main>
  )
}

// ARTICLE
function ArticlePage({ articleId, setPage }) {
  const meta    = ARTICLES.find(a => a.id === articleId)
  const content = ARTICLE_CONTENT[articleId]

  if (!meta || !content) return (
    <main style={{ maxWidth:800, margin:'80px auto', padding:'0 24px', textAlign:'center' }}>
      <p style={{ color:C.textDim }}>Article not found.</p>
      <button onClick={() => setPage('guides')} style={{ background:'none', color:C.purpleLight, fontFamily:F.mono, marginTop:14 }}>← Back to Guides</button>
    </main>
  )

  return (
    <main style={{ maxWidth:760, margin:'0 auto', padding:'48px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom:26, display:'flex', gap:8, alignItems:'center' }}>
        <button onClick={() => setPage('guides')} style={{ background:'none', color:C.textDim, fontFamily:F.mono, fontSize:'0.72rem', letterSpacing:'0.08em', textTransform:'uppercase' }}>Guides</button>
        <span style={{ color:C.textMuted }}>›</span>
        <span style={{ fontFamily:F.mono, fontSize:'0.72rem', color:C.textMuted, letterSpacing:'0.06em', textTransform:'uppercase' }}>{meta.category}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom:32 }}>
        <Tag label={meta.tag} color={meta.tagColor} />
        <h1 style={{ fontFamily:F.display, fontWeight:900, fontSize:'clamp(1.5rem,4vw,2.1rem)', color:C.text, lineHeight:1.25, margin:'16px 0' }}>
          {content.title}
        </h1>
        <div style={{ display:'flex', gap:14, alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ fontFamily:F.mono, fontSize:'0.7rem', color:C.textMuted }}>{meta.readTime} read</span>
          <span style={{ width:3, height:3, background:C.textMuted, borderRadius:'50%', display:'inline-block' }} />
          <span style={{ fontFamily:F.mono, fontSize:'0.7rem', color:C.textMuted }}>{meta.category}</span>
        </div>
        <div style={{ width:40, height:3, background:`linear-gradient(to right,${C.purple},transparent)`, marginTop:14, borderRadius:2 }} />
      </div>

      {/* CTA Banner */}
      <div style={{
        background:'rgba(124,58,237,0.08)', border:`1px solid rgba(124,58,237,0.25)`,
        borderRadius:12, padding:'16px 20px', marginBottom:32,
        display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12,
      }}>
        <div>
          <div style={{ fontFamily:F.mono, fontSize:'0.68rem', color:C.purple, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>Try It Now</div>
          <div style={{ fontFamily:F.display, fontWeight:800, color:C.text, fontSize:'0.97rem' }}>Free Custom Wheel Builder — No Signup</div>
        </div>
        <button onClick={() => setPage('tools')} style={{
          background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
          color:'#fff', border:'none', borderRadius:8,
          padding:'9px 20px', fontFamily:F.display, fontWeight:800, fontSize:'0.85rem',
        }}>Build Your Wheel →</button>
      </div>

      {/* Article body */}
      <div className="article-body" dangerouslySetInnerHTML={{ __html:content.content }} />

      {/* FAQ */}
      {content.faq && (
        <div style={{ marginTop:40 }}>
          <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>FAQ</div>
          <h2 style={{ fontFamily:F.display, fontWeight:900, fontSize:'1.3rem', color:C.text, marginBottom:18 }}>Common Questions</h2>
          {content.faq.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
        </div>
      )}

      {/* More articles */}
      <div style={{ marginTop:52 }}>
        <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMuted, marginBottom:6 }}>Keep Reading</div>
        <h2 style={{ fontFamily:F.display, fontWeight:900, fontSize:'1.2rem', color:C.text, marginBottom:18 }}>More Guides</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:14 }}>
          {ARTICLES.filter(a => a.id !== articleId).slice(0, 2).map(a => <ArticleCard key={a.id} article={a} setPage={setPage} />)}
        </div>
      </div>
    </main>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState('home')
  const articleIds      = ARTICLES.map(a => a.id)
  const isArticle       = articleIds.includes(page)
  const nav = (p) => { setPage(p); window.scrollTo({ top:0, behavior:'smooth' }) }

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        <NavBar page={page} setPage={nav} />
        <div style={{ flex:1 }}>
          {page==='home'   && <HomePage   setPage={nav} />}
          {page==='tools'  && <ToolsPage  />}
          {page==='guides' && <GuidesPage setPage={nav} />}
          {isArticle       && <ArticlePage articleId={page} setPage={nav} />}
        </div>
        <Footer setPage={nav} />
      </div>
    </>
  )
}
