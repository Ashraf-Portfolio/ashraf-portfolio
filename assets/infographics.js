function drawResumeTimeline() {
    const data = [
        { name: "Foundation Studies in Management, UUM", start: "2025-07-01", end: "2025-12-31", details: "Relevant coursework: Introduction to ICT, Principles of Economics, etc.", type: "education" },
        { name: "SPM, Kolej Sultan Abdul Hamid", start: "2024-01-01", end: "2025-02-28", details: "8As; Prefectorial Board Secretary, Chairman of Kadet Remaja Sekolah", type: "education" },
        { name: "Part-Time Tutor, Pusat Tusyen Inspirasi", start: "2025-02-01", end: "2025-06-30", details: "Planned lessons, prepared worksheets, monitored progress", type: "work" },
        { name: "Part-Time Admin Assistant, Ramli, Amrjit & Tan", start: "2025-03-01", end: "2025-06-30", details: "Managed calls/appointments, correspondence, office supplies", type: "work" }
    ];
    const margin = { top: 80, right: 40, bottom: 120, left: 120 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    d3.select("#resume-timeline").html("");
    const svg = d3.select("#resume-timeline")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("role", "img")
        .attr("aria-label", "Resume timeline infographic")
        .call(d3.zoom().scaleExtent([1, 5]).on("zoom", e => d3.select(this).select("g").attr("transform", e.transform)))
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    const colors = {
        education: "#4F46E5",
        work: "#0070F3",
        background: document.body.dataset.theme === 'dark' ? "#374151" : "#f8fafc",
        text: document.body.dataset.theme === 'dark' ? "#F9FAFB" : "#1f2937"
    };
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", colors.background)
        .attr("rx", 8);
    const xScale = d3.scaleTime()
        .domain([new Date("2024-01-01"), new Date("2025-12-31")])
        .range([0, width]);
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, height])
        .padding(0.4);
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(d3.timeMonth.every(3)).tickSize(-height).tickFormat(""))
        .attr("stroke-opacity", 0.1);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(d3.timeMonth.every(3)))
        .selectAll("text")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "11px")
        .attr("dy", "1em");
    svg.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "12px")
        .style("font-weight", "500")
        .style("fill", colors.text);
    const gradient = svg.append("defs")
        .selectAll("linearGradient")
        .data(data)
        .enter().append("linearGradient")
        .attr("id", (d, i) => `gradient-${i}`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d => d.type === "education" ? "#4F46E5" : "#0070F3")
        .attr("stop-opacity", 0.8);
    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d => d.type === "education" ? "#6366F1" : "#0080FF")
        .attr("stop-opacity", 0.8);
    svg.selectAll(".timeline-bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "timeline-bar")
        .attr("x", d => xScale(new Date(d.start)))
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 4)
        .attr("width", 0)
        .attr("height", yScale.bandwidth() / 2)
        .attr("rx", 4)
        .attr("fill", (d, i) => `url(#gradient-${i})`)
        .on("mouseover", function(event, d) {
            d3.select(this).attr("stroke", colors.text).attr("stroke-width", 2);
            const [x, y] = d3.pointer(event, this);
            tooltip.style("opacity", 1)
                .html(`<strong>${d.name}</strong><br>${d.details}`)
                .style("left", (x + 10) + "px")
                .style("top", (y - 28) + "px");
        })
        .on("mouseout", function() {
            d3.select(this).attr("stroke", "none");
            tooltip.style("opacity", 0);
        })
        .transition()
        .duration(800)
        .delay((d, i) => i * 200)
        .attr("width", d => xScale(new Date(d.end)) - xScale(new Date(d.start)));
    svg.selectAll(".duration-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "duration-label")
        .attr("x", d => xScale(new Date(d.start)) + (xScale(new Date(d.end)) - xScale(new Date(d.start))) / 2)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2 + 4)
        .text(d => {
            const start = new Date(d.start);
            const end = new Date(d.end);
            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
            return `${months} month${months !== 1 ? 's' : ''}`;
        })
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "10px")
        .style("fill", "white")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("pointer-events", "none");
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -40)
        .text("Professional Timeline")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .style("fill", colors.text)
        .style("text-anchor", "middle");
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -15)
        .text("Ashraf Harith bin Abdul Halim - Motivated UUM foundation student")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "14px")
        .style("fill", document.body.dataset.theme === 'dark' ? "#D1D5DB" : "#6b7280")
        .style("text-anchor", "middle");
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 200}, ${height + 60})`);
    legend.append("rect")
        .attr("x", 0)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colors.education)
        .attr("rx", 3);
    legend.append("text")
        .attr("x", 25)
        .attr("y", 12)
        .text("Education")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "12px")
        .style("fill", colors.text);
    legend.append("rect")
        .attr("x", 100)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colors.work)
        .attr("rx", 3);
    legend.append("text")
        .attr("x", 125)
        .attr("y", 12)
        .text("Work Experience")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "12px")
        .style("fill", colors.text);
    const tooltip = d3.select("body").select(".timeline-tooltip");
    if (tooltip.empty()) {
        d3.select("body").append("div")
            .attr("class", "timeline-tooltip")
            .style("position", "absolute")
            .style("background", colors.background)
            .style("color", colors.text)
            .style("padding", "8px 12px")
            .style("border-radius", "6px")
            .style("font-family", "Inter, sans-serif")
            .style("font-size", "12px")
            .style("box-shadow", "0 4px 6px rgba(0,0,0,0.1)")
            .style("opacity", 0)
            .style("pointer-events", "none")
            .style("border", "1px solid #e5e7eb")
            .style("white-space", "normal")
            .style("word-wrap", "break-word");
    }
}

function drawSkillsRadar() {
    const data = [
        { skill: "Microsoft Office", value: 90, category: "Technical" },
        { skill: "Google Workspace", value: 80, category: "Technical" },
        { skill: "Time Management", value: 85, category: "Soft Skills" },
        { skill: "Critical Thinking", value: 80, category: "Soft Skills" },
        { skill: "Communication", value: 90, category: "Soft Skills" },
        { skill: "Teamwork", value: 85, category: "Soft Skills" },
        { skill: "Bahasa/English", value: 95, category: "Languages" },
        { skill: "Chinese", value: 60, category: "Languages" }
    ];
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    d3.select("#skills-radar").html("");
    const svg = d3.select("#skills-radar")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("role", "img")
        .attr("aria-label", "Skills radar infographic")
        .append("g")
        .attr("transform", `translate(${margin.left + width/2},${margin.top + height/2})`);
    const colors = {
        background: document.body.dataset.theme === 'dark' ? "#374151" : "#f8fafc",
        text: document.body.dataset.theme === 'dark' ? "#F9FAFB" : "#374151"
    };
    const colorScale = d3.scaleOrdinal()
        .domain(["Technical", "Soft Skills", "Languages"])
        .range(["#0070F3", "#4F46E5", "#10B981"]);
    const angleSlice = Math.PI * 2 / data.length;
    const radius = Math.min(width, height) / 2 - 40;
    const radialScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, radius]);
    for (let i = 1; i <= 5; i++) {
        svg.append("circle")
            .attr("r", radius * i / 5)
            .attr("fill", "none")
            .attr("stroke", document.body.dataset.theme === 'dark' ? "#6B7280" : "#e5e7eb")
            .attr("stroke-width", 1);
    }
    const bars = svg.selectAll(".skill-bar")
        .data(data)
        .enter()
        .append("g");
    bars.append("path")
        .attr("class", "skill-background")
        .attr("d", (d, i) => {
            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius)
                .startAngle(i * angleSlice - angleSlice/2)
                .endAngle(i * angleSlice + angleSlice/2);
            return arc();
        })
        .attr("fill", colors.background)
        .attr("stroke", document.body.dataset.theme === 'dark' ? "#6B7280" : "#e5e7eb");
    bars.append("path")
        .attr("class", "skill-fill")
        .attr("d", (d, i) => {
            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(0)
                .startAngle(i * angleSlice - angleSlice/2)
                .endAngle(i * angleSlice + angleSlice/2);
            return arc();
        })
        .attr("fill", d => colorScale(d.category))
        .attr("fill-opacity", 0.7)
        .on("click", function(event, d) {
            const [x, y] = d3.pointer(event, this);
            tooltip.style("opacity", 1)
                .html(`<strong>${d.skill}</strong><br>${d.category}: ${d.value}%`)
                .style("left", (x + 10) + "px")
                .style("top", (y - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attrTween("d", function(d, i) {
            const interpolate = d3.interpolate(0, radialScale(d.value));
            return t => {
                const arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(interpolate(t))
                    .startAngle(i * angleSlice - angleSlice/2)
                    .endAngle(i * angleSlice + angleSlice/2);
                return arc();
            };
        });
    bars.append("text")
        .attr("class", "skill-label")
        .attr("transform", (d, i) => {
            const angle = i * angleSlice;
            const rotate = angle * 180 / Math.PI;
            return `rotate(${rotate}) translate(${radius + 15}, 0) ${rotate > 90 && rotate < 270 ? 'rotate(180)' : ''}`;
        })
        .text(d => d.skill)
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "11px")
        .style("text-anchor", "middle")
        .style("fill", colors.text);
    bars.append("text")
        .attr("class", "value-label")
        .attr("transform", (d, i) => {
            const angle = i * angleSlice;
            const valueRadius = radialScale(d.value) * 0.8;
            return `translate(${valueRadius * Math.cos(angle - Math.PI/2)}, ${valueRadius * Math.sin(angle - Math.PI/2)})`;
        })
        .text(d => d.value + "%")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("fill", "white")
        .style("text-anchor", "middle");
    svg.append("text")
        .attr("class", "chart-title")
        .attr("y", -radius - 50)
        .text("Skills Overview")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .style("text-anchor", "middle")
        .style("fill", colors.text);
    const legend = svg.append("g")
        .attr("transform", `translate(${-width/2 + 20}, ${height/2 - 20})`);
    const categories = Array.from(new Set(data.map(d => d.category)));
    categories.forEach((category, i) => {
        const legendItem = legend.append("g")
            .attr("transform", `translate(0, ${i * 25})`);
        legendItem.append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", colorScale(category))
            .attr("rx", 3);
        legendItem.append("text")
            .attr("x", 25)
            .attr("y", 12)
            .text(category)
            .style("font-family", "Inter, sans-serif")
            .style("font-size", "12px")
            .style("fill", colors.text);
    });
    const tooltip = d3.select("body").select(".timeline-tooltip");
}

function drawPortfolioImpact() {
    const data = {
        projects: [
            { name: "Digital Check-In", impact: 9, details: "Promote Awareness, Provide Support", link: "https://forms.gle/viHTz1VyxMCvMhBQ6" },
            { name: "Group Management", impact: 8, details: "Led 5-member team on company plan" },
            { name: "Leadership Workshop", impact: 8, details: "Enhanced teamwork/public speaking" }
        ],
        caseStudies: [
            { name: "Mental Health App", impact: 8, details: "Increased awareness, empowered problem-solving" },
            { name: "Adapting to Uni Life", impact: 7, details: "Built support system via activities" },
            { name: "Career Interests", impact: 8, details: "Clarified goals through exploration" }
        ],
        testimonials: [
            "“Ashraf is a dependable leader...” – Lecturer, UUM",
            "“His ability to organize events...” – Student Club President"
        ]
    };
    d3.select("#portfolio-impact").html("");
    const container = d3.select("#portfolio-impact")
        .style("display", "grid")
        .style("grid-template-columns", "1fr 1fr")
        .style("gap", "40px");
    const colors = {
        background: document.body.dataset.theme === 'dark' ? "#374151" : "#f8fafc",
        text: document.body.dataset.theme === 'dark' ? "#F9FAFB" : "#1f2937"
    };
    const projectSvg = container.append("svg")
        .attr("viewBox", "0 0 400 400")
        .style("background", colors.background)
        .style("border-radius", "12px")
        .attr("role", "img")
        .attr("aria-label", "Portfolio projects impact infographic");
    const projectScale = d3.scaleSqrt()
        .domain([0, 10])
        .range([10, 60]);
    const colorScale = d3.scaleOrdinal()
        .domain(data.projects.map(d => d.name))
        .range(["#0070F3", "#4F46E5", "#10B981"]);
    const simulation = d3.forceSimulation(data.projects)
        .force("charge", d3.forceManyBody().strength(50))
        .force("center", d3.forceCenter(200, 200))
        .force("collision", d3.forceCollide().radius(d => projectScale(d.impact) + 2));
    const bubbles = projectSvg.selectAll(".bubble")
        .data(data.projects)
        .enter().append("g")
        .attr("class", "bubble");
    bubbles.append("circle")
        .attr("r", d => projectScale(d.impact))
        .attr("fill", d => colorScale(d.name))
        .attr("fill-opacity", 0.7)
        .attr("stroke", d => d3.color(colorScale(d.name)).darker(0.3))
        .attr("stroke-width", 2)
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill-opacity", 0.9);
            const [x, y] = d3.pointer(event, this);
            tooltip.style("opacity", 1)
                .html(`<strong>${d.name}</strong><br>${d.details}${d.link ? '<br><a href="' + d.link + '" target="_blank">View</a>' : ''}`)
                .style("left", (x + 10) + "px")
                .style("top", (y - 28) + "px");
        })
        .on("mouseout", function() {
            d3.select(this).attr("fill-opacity", 0.7);
            tooltip.style("opacity", 0);
        })
        .on("click", d => d.link ? window.open(d.link, "_blank") : null);
    bubbles.append("text")
        .text(d => d.name)
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .style("text-anchor", "middle")
        .style("fill", "white");
    bubbles.append("text")
        .attr("dy", "1.2em")
        .text(d => `Impact: ${d.impact}/10`)
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .style("fill", "white");
    simulation.on("tick", () => {
        bubbles.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    projectSvg.append("text")
        .attr("x", 200)
        .attr("y", 30)
        .text("Project Impact (Bubble Size)")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("text-anchor", "middle")
        .style("fill", colors.text);
    const caseSvg = container.append("svg")
        .attr("viewBox", "0 0 400 400")
        .style("background", colors.background)
        .style("border-radius", "12px")
        .attr("role", "img")
        .attr("aria-label", "Portfolio case studies impact infographic");
    const caseMargin = { top: 40, right: 30, bottom: 60, left: 60 };
    const caseWidth = 400 - caseMargin.left - caseMargin.right;
    const caseHeight = 400 - caseMargin.top - caseMargin.bottom;
    const caseG = caseSvg.append("g")
        .attr("transform", `translate(${caseMargin.left},${caseMargin.top})`);
    const xScale = d3.scaleBand()
        .domain(data.caseStudies.map(d => d.name))
        .range([0, caseWidth])
        .padding(0.3);
    const yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([caseHeight, 0]);
    caseG.selectAll(".bar")
        .data(data.caseStudies)
        .enter().append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", caseHeight)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("fill", (d, i) => ["#0070F3", "#4F46E5", "#10B981"][i])
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill-opacity", 0.9);
            const [x, y] = d3.pointer(event, this);
            tooltip.style("opacity", 1)
                .html(`<strong>${d.name}</strong><br>${d.details}`)
                .style("left", (x + 10) + "px")
                .style("top", (y - 28) + "px");
        })
        .on("mouseout", function(d, i) {
            d3.select(this).attr("fill-opacity", 1);
            tooltip.style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .attr("y", d => yScale(d.impact))
        .attr("height", d => caseHeight - yScale(d.impact));
    caseG.selectAll(".value")
        .data(data.caseStudies)
        .enter().append("text")
        .attr("x", d => xScale(d.name) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.impact) - 5)
        .text(d => d.impact)
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("text-anchor", "middle")
        .style("fill", colors.text);
    caseG.append("g")
        .attr("transform", `translate(0,${caseHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "10px")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .style("fill", colors.text);
    caseG.append("g")
        .call(d3.axisLeft(yScale).ticks(5))
        .selectAll("text")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "10px")
        .style("fill", colors.text);
    caseSvg.append("text")
        .attr("x", 200)
        .attr("y", 30)
        .text("Case Study Impact")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("text-anchor", "middle")
        .style("fill", colors.text);
    const testimonialSvg = container.append("svg")
        .attr("viewBox", `0 0 ${2 * (400 + 30)} 100`)
        .style("background", colors.background)
        .style("border-radius", "12px")
        .attr("role", "img")
        .attr("aria-label", "Portfolio testimonials");
    testimonialSvg.append("rect")
        .attr("x", 20)
        .attr("y", 20)
        .attr("width", 2 * 400 - 40)
        .attr("height", 60)
        .attr("fill", document.body.dataset.theme === 'dark' ? "#4B5563" : "lightblue")
        .attr("fill-opacity", 0.5)
        .attr("rx", 10);
    testimonialSvg.append("text")
        .attr("x", 400)
        .attr("y", 50)
        .text(data.testimonials.join(" "))
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "9px")
        .style("text-anchor", "middle")
        .style("fill", colors.text)
        .call(function(text) {
            text.each(function() {
                const t = d3.select(this);
                const words = t.text().split(" ").reverse();
                let line = [];
                let lineNumber = 0;
                const lineHeight = 12;
                const y = t.attr("y");
                const x = t.attr("x");
                let tspan = t.text(null).append("tspan").attr("x", x).attr("y", y);
                let word;
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > (2 * 400 - 40)) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = t.append("tspan").attr("x", x).attr("y", parseFloat(y) + ++lineNumber * lineHeight);
                    }
                }
            });
        });
    const tooltip = d3.select("body").select(".timeline-tooltip");
}