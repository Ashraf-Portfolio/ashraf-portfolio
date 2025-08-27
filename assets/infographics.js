function drawResumeTimeline() {
    const data = [
        { name: "Foundation Studies in Management, UUM", start: "2025-07-01", end: "2025-12-31", details: "Relevant coursework: Introduction to ICT, Principles of Economics, etc." },
        { name: "Sijil Pelajaran Malaysia (SPM), Kolej Sultan Abdul Hamid", start: "2024-01-01", end: "2025-02-28", details: "8As; Prefectorial Board Secretary, Chairman of Kadet Remaja Sekolah, Cooperative Club" },
        { name: "Part-Time Tutor, Pusat Tusyen Inspirasi", start: "2025-02-01", end: "2025-06-30", details: "Planned lessons, prepared worksheets, monitored progress" },
        { name: "Part-Time Admin Assistant, Ramli, Amrjit & Tan", start: "2025-03-01", end: "2025-06-30", details: "Managed calls/appointments, correspondence, office supplies" }
    ];

    const margin = { top: 50, right: 20, bottom: 100, left: 200 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#resume-timeline")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime()
        .domain([new Date("2024-01-01"), new Date("2025-12-31")])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, height])
        .padding(0.2);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(d3.timeMonth.every(6)))
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "10px");

    svg.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "10px")
        .style("font-weight", "bold");

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(new Date(d.start)))
        .attr("y", d => yScale(d.name))
        .attr("width", d => xScale(new Date(d.end)) - xScale(new Date(d.start)))
        .attr("height", yScale.bandwidth())
        .attr("fill", (d, i) => i % 2 ? "#4F46E5" : "#0070F3")
        .attr("opacity", 0)
        .transition()
        .duration(1000)
        .attr("opacity", 0.8);

    svg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => xScale(new Date(d.start)) + (xScale(new Date(d.end)) - xScale(new Date(d.start))) / 2)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2 + 5)
        .text(d => d.name)
        .style("font-family", "Arial")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("fill", "white")
        .style("text-anchor", "middle");

    svg.selectAll(".tooltip")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "tooltip")
        .attr("x", 10)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() + 20)
        .text(d => d.details.length > 50 ? d.details.slice(0, 50) + "..." : d.details)
        .style("font-family", "Arial")
        .style("font-size", "8px")
        .style("fill", "black");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -30)
        .text("Ashraf Harith bin Abdul Halim - Professional Timeline")
        .style("font-family", "Arial")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#0070F3")
        .style("text-anchor", "middle");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .text("Objective: Motivated UUM foundation student seeking internship in legal, administrative, or education sector.")
        .style("font-family", "Arial")
        .style("font-size", "12px")
        .style("font-style", "italic")
        .style("text-anchor", "middle");
}

function drawSkillsRadar() {
    const data = [
        { skill: "Microsoft Word/Excel/PowerPoint", value: 90 },
        { skill: "Canva/Google Workspace", value: 80 },
        { skill: "Time Management", value: 85 },
        { skill: "Critical Thinking", value: 80 },
        { skill: "Communication", value: 90 },
        { skill: "Teamwork", value: 85 },
        { skill: "Bahasa Melayu/English", value: 95 },
        { skill: "Chinese", value: 60 }
    ];

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 40;

    const svg = d3.select("#skills-radar")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const rScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, radius]);

    const angleSlice = Math.PI * 2 / data.length;

    const radarLine = d3.lineRadial()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice)
        .curve(d3.curveLinearClosed);

    const gridLevels = [20, 40, 60, 80, 100];
    svg.selectAll(".grid-circle")
        .data(gridLevels)
        .enter()
        .append("circle")
        .attr("r", d => rScale(d))
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-opacity", 0.5);

    svg.selectAll(".grid-label")
        .data(gridLevels)
        .enter()
        .append("text")
        .attr("x", 5)
        .attr("y", d => -rScale(d))
        .text(d => `${d}%`)
        .style("font-family", "Arial")
        .style("font-size", "8px")
        .style("fill", "grey");

    svg.selectAll(".axis")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "axis")
        .each(function(d, i) {
            d3.select(this)
                .append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
                .attr("y2", rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
                .attr("stroke", "grey")
                .attr("stroke-opacity", 0.5);
            d3.select(this)
                .append("text")
                .attr("x", (rScale(100) + 10) * Math.cos(angleSlice * i - Math.PI / 2))
                .attr("y", (rScale(100) + 10) * Math.sin(angleSlice * i - Math.PI / 2))
                .text(d.skill)
                .style("font-family", "Arial")
                .style("font-size", "9px")
                .style("text-anchor", i < data.length / 2 ? "start" : "end");
        });

    svg.append("path")
        .datum(data)
        .attr("d", radarLine)
        .attr("fill", "#0070F3")
        .attr("fill-opacity", 0.25)
        .attr("stroke", "#0070F3")
        .attr("stroke-width", 2)
        .transition()
        .duration(1000)
        .attrTween("d", function(d) {
            const interpolate = d3.interpolateArray(data.map(() => ({ value: 0 })), d);
            return t => radarLine(interpolate(t));
        });

    svg.append("text")
        .attr("x", 0)
        .attr("y", -radius - 20)
        .text("Ashraf Harith bin Abdul Halim - Skills Overview")
        .style("font-family", "Arial")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#0070F3")
        .style("text-anchor", "middle");

    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("r", 4)
        .attr("fill", "#0070F3")
        .on("mouseover", function(event, d) {
            d3.select(this).attr("r", 6);
            svg.append("text")
                .attr("class", "tooltip")
                .attr("x", 10)
                .attr("y", -10)
                .text(`${d.skill}: ${d.value}%`)
                .style("font-family", "Arial")
                .style("font-size", "10px")
                .style("fill", "black");
        })
        .on("mouseout", function() {
            d3.select(this).attr("r", 4);
            svg.select(".tooltip").remove();
        });
}

function drawPortfolioImpact() {
    const data = {
        projects: [
            { name: "Digital Check-In Link", impact: 9, details: "Promote Awareness, Provide Support (Link: forms.gle/viHTz1VyxMCvMhBQ6), Learned: User-friendly design", link: "https://forms.gle/viHTz1VyxMCvMhBQ6" },
            { name: "Group Management Assignment", impact: 8, details: "Led 5-member team on company plan" },
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

    const margin = { top: 50, right: 20, bottom: 100, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select("#portfolio-impact")
        .append("svg")
        .attr("viewBox", `0 0 ${2 * (width + margin.left + margin.right)} ${height + margin.top + margin.bottom + 50}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Projects (Vertical Bar Chart)
    const xProj = d3.scaleBand()
        .domain(data.projects.map(d => d.name))
        .range([0, width])
        .padding(0.2);

    const yProj = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

    const projG = svg.append("g");

    projG.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xProj))
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "10px")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    projG.append("g")
        .call(d3.axisLeft(yProj).ticks(5))
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "10px");

    projG.selectAll(".bar")
        .data(data.projects)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xProj(d.name))
        .attr("y", height)
        .attr("width", xProj.bandwidth())
        .attr("height", 0)
        .attr("fill", (d, i) => ["#0070F3", "#4F46E5", "#6366F1"][i])
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.7);
            svg.append("text")
                .attr("class", "tooltip")
                .attr("x", width + 20)
                .attr("y", 20)
                .text(d.details)
                .style("font-family", "Arial")
                .style("font-size", "8px")
                .style("fill", "black");
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            svg.select(".tooltip").remove();
        })
        .on("click", d => d.link ? window.open(d.link, "_blank") : null)
        .transition()
        .duration(1000)
        .attr("y", d => yProj(d.impact))
        .attr("height", d => height - yProj(d.impact));

    projG.selectAll(".label")
        .data(data.projects)
        .enter()
        .append("text")
        .attr("x", d => xProj(d.name) + xProj.bandwidth() / 2)
        .attr("y", d => yProj(d.impact) - 5)
        .text(d => d.impact)
        .style("font-family", "Arial")
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("text-anchor", "middle");

    projG.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .text("Project Impacts")
        .style("font-family", "Arial")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "#0070F3")
        .style("text-anchor", "middle");

    // Case Studies (Horizontal Bar Chart)
    const caseG = svg.append("g")
        .attr("transform", `translate(${width + margin.left + margin.right},0)`);

    const yCase = d3.scaleBand()
        .domain(data.caseStudies.map(d => d.name))
        .range([0, height])
        .padding(0.2);

    const xCase = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width]);

    caseG.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xCase).ticks(5))
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "10px");

    caseG.append("g")
        .call(d3.axisLeft(yCase))
        .selectAll("text")
        .style("font-family", "Arial")
        .style("font-size", "10px")
        .style("font-weight", "bold");

    caseG.selectAll(".bar")
        .data(data.caseStudies)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yCase(d.name))
        .attr("width", 0)
        .attr("height", yCase.bandwidth())
        .attr("fill", (d, i) => ["#0070F3", "#4F46E5", "#6366F1"][i])
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.7);
            svg.append("text")
                .attr("class", "tooltip")
                .attr("x", width + 20)
                .attr("y", 20)
                .text(d.details)
                .style("font-family", "Arial")
                .style("font-size", "8px")
                .style("fill", "black");
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            svg.select(".tooltip").remove();
        })
        .transition()
        .duration(1000)
        .attr("width", d => xCase(d.impact));

    caseG.selectAll(".label")
        .data(data.caseStudies)
        .enter()
        .append("text")
        .attr("x", d => xCase(d.impact) + 5)
        .attr("y", d => yCase(d.name) + yCase.bandwidth() / 2 + 5)
        .text(d => d.impact)
        .style("font-family", "Arial")
        .style("font-size", "10px")
        .style("font-weight", "bold");

    caseG.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .text("Case Study Impacts")
        .style("font-family", "Arial")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "#0070F3")
        .style("text-anchor", "middle");

    svg.append("text")
        .attr("x", (width + margin.left + margin.right))
        .attr("y", -30)
        .text("Ashraf Harith bin Abdul Halim - Portfolio Impact Overview")
        .style("font-family", "Arial")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#0070F3")
        .style("text-anchor", "middle");

    svg.append("rect")
        .attr("x", 0)
        .attr("y", height + 20)
        .attr("width", 2 * (width + margin.left + margin.right) - margin.left)
        .attr("height", 50)
        .attr("fill", "lightblue")
        .attr("fill-opacity", 0.5)
        .attr("rx", 10);

    svg.append("text")
        .attr("x", width + margin.left)
        .attr("y", height + 45)
        .text(data.testimonials.join(" "))
        .style("font-family", "Arial")
        .style("font-size", "9px")
        .style("text-anchor", "middle")
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
                    if (tspan.node().getComputedTextLength() > (width * 2 - 20)) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = t.append("tspan").attr("x", x).attr("y", parseFloat(y) + ++lineNumber * lineHeight);
                    }
                }
            });
        });
}

// Call functions on page load
document.addEventListener("DOMContentLoaded", () => {
    drawResumeTimeline();
    drawSkillsRadar();
    drawPortfolioImpact();
});