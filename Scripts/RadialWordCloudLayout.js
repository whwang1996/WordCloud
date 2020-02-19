(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.RadialWordCloudLayout = global.RadialWordCloudLayout || {})));
}(this, (function (exports) {
    'use strict';

    //Constructor
    function Word(word, textWidth, textHeight, weight, preferredLoc) {
        this.word = word;
        this.textWidth = textWidth;
        this.textHeight = textHeight;
        this.weight = weight;
        this.preferredLoc = preferredLoc;
    }

    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }

    function Rect(x, y, width, height) {
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
    }

    function SegEvent(yy) {
        this.y = yy;
        this.upIntervals = new Array();
        this.downIntervals = new Array();
    }

    function DataItem(point, word, size) {
        this.point = point;
        this.word = word;
        this.size = size;
    }

    function SortWord(w1, w2) {
        return w2.weight - w1.weight;
    }

    function Selection(_id) {
        this.text = selection_text;
        this.attr = selection_attr;
        this.show = selection_show;
    }

    let id;
    let select = function (_id) {
        id = _id;

        console.log(Selection);
        return new Selection();
    };

    let words = new Array();
    let selection_text = function (_words) {
        words = _words;
        return this;
    };

    let width;
    let height;
    let num;
    let minFontSize;
    let maxFontSize;
    let fontName;
    let rawData;

    let selection_attr = function (name, value) {
        switch (name) {
            case "width":
                width = value;
                break;
            case "height":
                height = value;
                break;
            case "num":
                num = value;
                break;
            case "minFontSize":
                minFontSize = value;
                break;
            case "font":
                fontName = value;
                break;
            case "maxFontSize":
                maxFontSize = value;
                break;
            case "data":
                rawData = value;
            default:
                alert("attr undefined!");
        }
        return this;
    };

    let selection_show = function () {
        wordCloud();
        return this;
    };

    /*Selection.prototype = {
        text:selection_text,
        attr:selection_attr,
        show:selection_show
    };*/

    let wordCloud = function () {
        rawData = {
            "topic1": {
                "weight": 100,
                "keywords": [
                    {
                        "keyword": "\u4f3c",
                        "weight": 100
                    },
                    {
                        "keyword": "keyword2",
                        "weight": 90
                    }
                    ,
                    {
                        "keyword": "keyword2",
                        "weight": 80
                    }
                    ,
                    {
                        "keyword": "keyword2",
                        "weight": 70
                    },
                    {
                        "keyword": "keyword1",
                        "weight": 60
                    },
                    {
                        "keyword": "keyword2",
                        "weight": 50
                    }
                    ,
                    {
                        "keyword": "keyword2",
                        "weight": 40
                    }
                    ,
                    {
                        "keyword": "keyword2",
                        "weight": 30
                    },
                    {
                        "keyword": "keyword1",
                        "weight": 20
                    },
                    {
                        "keyword": "keyword2",
                        "weight": 10
                    }
                ]
            },
            "topic2": {
                "weight": 100,
                "keywords": [
                    {
                        "keyword": "keyword1",
                        "weight": 100
                    },
                    {
                        "keyword": "keyword2",
                        "weight": 90
                    }
                    ,
                    {
                        "keyword": "keyword2",
                        "weight": 80
                    }
                    ,
                    {
                        "keyword": "keyword2",
                        "weight": 70
                    },
                    {
                        "keyword": "keyword1",
                        "weight": 60
                    },
                    {
                        "keyword": "keyword2",
                        "weight": 50
                    }
                    ,
                    {
                        "keyword": "keyword2",
                        "weight": 40
                    }
                    ,
                    {
                        "keyword": "keyword2",
                        "weight": 30
                    },
                    {
                        "keyword": "keyword1",
                        "weight": 20
                    },
                    {
                        "keyword": "keyword2",
                        "weight": 10
                    }
                ]
            }
        };
        rawData = [{"topic": "24", "keywords": [{"keyword": "\u4f8b", "weight": 0.33858454622970025}, {"keyword": "\u75c5\u4f8b", "weight": 0.06874955571607629}, {"keyword": "\u7d2f\u8ba1", "weight": 0.0411339063695961}, {"keyword": "\u786e\u8bca", "weight": 0.03528462724445244}, {"keyword": "\u65b0\u589e", "weight": 0.03158239244834429}, {"keyword": "\u6cbb\u6108", "weight": 0.027823490793112037}, {"keyword": "\u9662", "weight": 0.02478236935345177}, {"keyword": "\u51fa", "weight": 0.02097309715677587}, {"keyword": "\u62a5\u544a", "weight": 0.01818382842433384}, {"keyword": "\u533b\u5b66", "weight": 0.016691601134065762}], "weight": 157841.0}, {"topic": "97", "keywords": [{"keyword": "\u5de5\u4f5c", "weight": 0.035820817108929606}, {"keyword": "\u75ab\u60c5", "weight": 0.031127784528375873}, {"keyword": "\u63a7", "weight": 0.024866946815822997}, {"keyword": "\u9632", "weight": 0.0234652667309231}, {"keyword": "\u793e\u4f1a", "weight": 0.018948742012912315}, {"keyword": "\u843d\u5b9e", "weight": 0.018803382596700474}, {"keyword": "\u4fdd\u969c", "weight": 0.01411035001614674}, {"keyword": "\u6293", "weight": 0.013954607784491197}, {"keyword": "\u90e8\u7f72", "weight": 0.011576943047883223}, {"keyword": "\u4e2d\u592e", "weight": 0.011410818000783975}], "weight": 95331.0}, {"topic": "67", "keywords": [{"keyword": "\u63a7", "weight": 0.3379285835143315}, {"keyword": "\u9632", "weight": 0.33045663200253983}, {"keyword": "\u75ab\u60c5", "weight": 0.1495337301276213}, {"keyword": "\u5de5\u4f5c", "weight": 0.06339347899642764}, {"keyword": "\u5c0f\u7ec4", "weight": 0.01172824465065268}, {"keyword": "\u9886\u5bfc", "weight": 0.010841541544031828}, {"keyword": "\u6307\u6325\u90e8", "weight": 0.00766123306828504}, {"keyword": "\u505a\u597d", "weight": 0.007034629539606305}, {"keyword": "\u5206\u533a", "weight": 0.003487817113122899}, {"keyword": "\u5206\u7c7b", "weight": 0.0028612135844441637}], "weight": 83601.0}, {"topic": "12", "keywords": [{"keyword": "\u63a7", "weight": 0.03361704791296415}, {"keyword": "\u4eba\u5458", "weight": 0.02787814933894026}, {"keyword": "\u9632", "weight": 0.025109278686730796}, {"keyword": "\u75ab\u60c5", "weight": 0.024446642975090922}, {"keyword": "\u7ba1\u7406", "weight": 0.01927571786818692}, {"keyword": "\u901a\u544a", "weight": 0.01897989835406198}, {"keyword": "\u6307\u6325\u90e8", "weight": 0.01519340857326271}, {"keyword": "\u63aa\u65bd", "weight": 0.015122411889872725}, {"keyword": "\u4e00\u5f8b", "weight": 0.01276768855743818}, {"keyword": "\u62a5\u544a", "weight": 0.01204588894297332}], "weight": 83529.0}, {"topic": "7", "keywords": [{"keyword": "\u60a3\u8005", "weight": 0.10606700891516656}, {"keyword": "\u51fa\u9662", "weight": 0.0942277200220189}, {"keyword": "\u6cbb\u6108", "weight": 0.05402524262945995}, {"keyword": "\u540d", "weight": 0.03398484303335081}, {"keyword": "\u533b\u9662", "weight": 0.031320090445890035}, {"keyword": "\u80ba\u708e", "weight": 0.023009469362621944}, {"keyword": "\u6cbb\u7597", "weight": 0.020819261756489797}, {"keyword": "\u786e\u8bca", "weight": 0.018787235810800527}, {"keyword": "\u4eba\u6c11", "weight": 0.016000805022999075}, {"keyword": "\u6838\u9178", "weight": 0.01553842786170451}], "weight": 81202.0}, {"topic": "60", "keywords": [{"keyword": "\u4f8b", "weight": 0.28827457670621626}, {"keyword": "\u75c5\u4f8b", "weight": 0.07699237307466755}, {"keyword": "\u8bca\u65ad", "weight": 0.06630139996331252}, {"keyword": "\u4e34\u5e8a", "weight": 0.06462631661867625}, {"keyword": "\u542b", "weight": 0.055942980163024986}, {"keyword": "\u5e02", "weight": 0.0168002237714509}, {"keyword": "\u5168\u7701", "weight": 0.01543306015928453}, {"keyword": "\u7d2f\u8ba1", "weight": 0.013031286246019286}, {"keyword": "\u75c5", "weight": 0.012464713938274665}, {"keyword": "10", "weight": 0.012292278888091519}], "weight": 80208.0}, {"topic": "72", "keywords": [{"keyword": "\u793e\u533a", "weight": 0.07546700570443692}, {"keyword": "\u4eba\u5458", "weight": 0.05761146052088237}, {"keyword": "\u5de5\u4f5c", "weight": 0.05068683690489454}, {"keyword": "\u4f53\u6e29", "weight": 0.023372332659944414}, {"keyword": "\u67e5", "weight": 0.02059480340916926}, {"keyword": "\u6392", "weight": 0.017458883287326345}, {"keyword": "\u53d1\u70ed", "weight": 0.01571812762785436}, {"keyword": "\u5c45\u6c11", "weight": 0.01541093545265342}, {"keyword": "\u60c5\u51b5", "weight": 0.014425360557217076}, {"keyword": "\u8857\u9053", "weight": 0.013913373598548846}], "weight": 77145.0}, {"topic": "0", "keywords": [{"keyword": "\u6d88\u6bd2", "weight": 0.0674508264142006}, {"keyword": "\u65f6", "weight": 0.0173266688486267}, {"keyword": "\u901a\u98ce", "weight": 0.015935089079522582}, {"keyword": "\u573a\u6240", "weight": 0.01578501675148194}, {"keyword": "\u6d88", "weight": 0.015321156828447235}, {"keyword": "\u6d17\u624b", "weight": 0.014816368088674172}, {"keyword": "\u9152\u7cbe", "weight": 0.012919999579796988}, {"keyword": "\u7a7a\u6c14", "weight": 0.012865427824145846}, {"keyword": "\u624b", "weight": 0.012442496717849496}, {"keyword": "\u536b\u751f", "weight": 0.010682557598100167}], "weight": 72316.0}, {"topic": "76", "keywords": [{"keyword": "\u4f01\u4e1a", "weight": 0.10868618377410398}, {"keyword": "\u590d\u5de5", "weight": 0.08347179577762757}, {"keyword": "\u4ea7", "weight": 0.04307068368892347}, {"keyword": "\u590d", "weight": 0.04030443157740659}, {"keyword": "\u751f\u4ea7", "weight": 0.022420611676449927}, {"keyword": "\u5458\u5de5", "weight": 0.0197788409099513}, {"keyword": "\u8fd4", "weight": 0.016044400559403506}, {"keyword": "\u5c97", "weight": 0.014273999208032701}, {"keyword": "\u9632", "weight": 0.014038867778553765}, {"keyword": "\u63a7", "weight": 0.013444123574577636}], "weight": 71318.0}];
        // const maxAreaWidth = width * 0.3;
        // const minAreaWidth = width * 0.1;
        // const maxAreaHeight = height * 0.3;
        // const minAreaHeight = height * 0.1;
        //
        // let areaWidthScale = d3.scalePow()
        //     .exponent(0.3)
        //     .domain(d3.extent(rawData, function (topic) { return topic.weight }))
        //     .range([minAreaWidth, maxAreaWidth]);
        //
        // let areaHeightScale = d3.scalePow()
        //     .exponent(0.3)
        //     .domain(d3.extent(rawData, function (topic) { return topic.weight }))
        //     .range([minAreaHeight, maxAreaHeight]);
        const layoutCenters = [
            new Point(width / 2, height / 2),
            new Point(width / 5, height / 2),
            new Point(width / 4, height / 4),
            new Point(width / 2, height / 6),
            new Point(width / 4 * 3, height / 4),
            new Point(width / 5 * 4, height / 2),
            new Point(width / 4 * 3, height / 4 * 3),
            new Point(width / 2, height / 6 * 5),
            new Point(width / 4, height / 4 * 3),
        ];

        let layoutWordList = [];
        let index2TopicDict = {};
        let topic2LayoutCenterDict = {};
        rawData.forEach((elem, index) => {
            let keywords = elem.keywords;

            let fontSizeScale = d3.scalePow()
                .exponent(0.3)
                .domain(d3.extent(keywords, function (word) {
                    return word.weight
                }))
                .range([minFontSize, maxFontSize]);

            keywords.forEach(item => {
                index2TopicDict[layoutWordList.length] = elem.topic;

                let measureRes = measureText(item.keyword, fontSizeScale(item.weight));
                layoutWordList.push(new Word(item.keyword, measureRes.width, measureRes.height, fontSizeScale(item.weight), layoutCenters[index]))
            });

            topic2LayoutCenterDict[elem.topic] = layoutCenters[index];
        });

        let data = wordCloudLayout(layoutWordList, width, height);
        let topic2PointsDict = {};
        data.forEach((item, index) => {
            let topic = index2TopicDict[index];
            if (!(topic in topic2PointsDict)) {
                topic2PointsDict[topic] = [];
            }
            topic2PointsDict[topic].push(item);
        });

        let svg = d3.select("#" + id)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        Object.keys(topic2PointsDict).forEach((topic, index) => {
            let points = topic2PointsDict[topic];

            let group = svg.append("g").attr('id', topic);
            let g_text = group
                .append('g');
            g_text
                .selectAll("text")
                .data(points)
                .enter()
                .append("text")
                .classed("wordCloudText", true)
                .style("font-size", function (d) {
                    return d.size + "px";
                })
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.point.X, d.point.Y] + ")rotate(" + 0 + ")";
                })
                .text(function (d) {
                    return d.word;
                })
                .style('fill', CategoryColor[index])
                .style('opacity', 1);

            let node = document.getElementById(topic);
            let groupWidth = node.getBBox().width;
            let groupHeight = node.getBBox().height;

            if (index === 0) {
                group
                .append('ellipse')
                .attr('cx', topic2LayoutCenterDict[topic].X)
                .attr('cy', topic2LayoutCenterDict[topic].Y)
                .attr('rx', groupWidth / 2 * 1.2)
                .attr('ry', groupHeight / 2 * 1.2)
                .style('fill', 'none')
                .style('stroke', CategoryColor[index])
                .style('opacity', 0.8);
            }

            g_text.raise();
        });
    };

    let wordCloudLayout = function (wordList, width, height) {
        //alert("wordCloudLayout");
        let boundWidth = width;
        let boundHeight = height;
        let HorizontalGap = 2;
        let VerticalGap = 2;

        let labelBounds = [];
        let isPlaced = [];
        let preferredLocs = [];
        for (let i = 0; i < wordList.length; i++) {
            preferredLocs.push(wordList[i].preferredLoc);
            isPlaced.push(true);
            let lb = new Rect(0, 0, wordList[i].textWidth + HorizontalGap * 2, wordList[i].textHeight + VerticalGap * 2);
            labelBounds.push(lb);
        }
        let se_up = new SegEvent(0);
        se_up.downIntervals.push(0, boundWidth);
        let se_down = new SegEvent(boundHeight);
        se_down.upIntervals.push(0, boundWidth);

        let res = ConstrainedTagCloudAlg(labelBounds, isPlaced, preferredLocs, boundWidth, boundHeight, se_up, se_down, HorizontalGap, VerticalGap, wordList);
        let result = [];
        for (let i = 0; i < res.length; i++) {
            let position = new Point(res[i].point.X + wordList[i].textWidth / 2, res[i].point.Y + wordList[i].textHeight);
            let r = new DataItem(position, wordList[i].word, wordList[i].weight);
            result.push(r);
        }
        return result;
    };


    let alignTolerance = 3;
    let maxTolDist;
    let ellipseRatio;
    let events = [];

    let ConstrainedTagCloudAlg = function (labelBounds, isplaced, preferLocs, boundWidth, boundHeight, se_up, se_down, HorizontalGap, VerticalGap, wordList) {
        ellipseRatio = boundWidth / boundHeight;
        maxTolDist = Math.min(boundWidth / 2, boundHeight / 2) - 5;
        events.splice(0, events.length);
        events.push(se_up, se_down);

        let result = [];
        PlaceRectangles(labelBounds, isplaced, preferLocs);
        for (let i = 0; i < labelBounds.length; i++) {
            if (i === 0 && !isplaced[0]) {
                alert("is too large to be shown on the word cloud!!!");
                continue;
            }
            else if (isplaced[i]) {
                let position = new Point(labelBounds[i].X + HorizontalGap, labelBounds[i].Y + VerticalGap);
                let res = new DataItem(position, wordList[i].word, wordList[i].weight);
                result.push(res);
            }
        }
        return result;
    };

/// <summary>
/// Generate the new segment event in the line of <code>yLine</code>, and return the index of events.
/// If the yline is aligned with existed event segment, use the exsited one.
/// </summary>
    let GeneratePreferSegEvent = function (yLine) {
        //alert("yLine = " + yLine);
        //alert("events[0].y = " + events[0].y);
        if (yLine <= events[0].y) {
            return 0;
        }

        for (let i = 1; i < events.length; i++) {
            let se = events[i];
            let pse = events[i - 1];
            if (pse.y < yLine && se.y >= yLine) {
                // adding the extra center events.
                if (se.y - yLine > alignTolerance) {
                    let centerEvent = new SegEvent(yLine);
                    centerEvent.upIntervals = pse.downIntervals;
                    centerEvent.downIntervals = se.upIntervals.slice();
                    se.upIntervals = centerEvent.downIntervals;
                    events.splice(i, 0, centerEvent);
                }
                //alert("i = " + i);
                return i;
            }
        }
        return events.length - 1;
    };

/// <summary>
/// Intersect interval orig and other. deposite the result in orig interval.
/// </summary>
    let IntersectInterval = function (orig, other) {
        //alert("IntersectInterval");
        for (let i = 0; i < orig.length; i += 2) {
            let s = orig[i];
            let t = orig[i + 1];

            let addCnt = 0;
            let cnt = 0;
            while (cnt < other.length && other[cnt] < t) {
                let os = other[cnt];
                let ot = other[cnt + 1];

                if (ot > s) {
                    if (0 === addCnt) {
                        orig[i] = Math.max(s, os);
                        orig[i + 1] = Math.min(t, ot);
                        addCnt = 2;
                    }
                    else {
                        orig.splice(i + addCnt, 0, Math.max(s, os));
                        orig.splice(i + addCnt + 1, 0, Math.min(t, ot));
                    }
                }
                cnt += 2;
            }

            if (0 === addCnt) {
                orig.splice(i, 2);
                i -= 2;
            }
            else {
                i += addCnt - 2;
            }
        }
    };

/// <summary>
/// Find the position which is the best place to displace word in the intervals
/// </summary>
    let FillInterval = function (interval, width, cx) {
        //alert("FillInterval");
        let x = -Infinity;
        let minDist = Number.MAX_VALUE;

        let hw = width / 2;
        for (let i = 0; i < interval.length; i += 2) {
            let s = interval[i];
            let t = interval[i + 1];
            if (t - s >= width) {
                // calculate x
                if (t >= cx && s <= cx) {
                    // special case, in the region
                    if (t - cx >= hw && cx - s >= hw) {
                        return cx;
                    }
                    //left of centre
                    else if (t - cx > hw) {
                        return s + hw;
                    }
                    //right of centre
                    else {
                        return t - hw;
                    }
                }

                let xx = t <= cx ? t - hw : s + hw;
                //make x as near to the center as possible
                let d = Math.abs(xx - cx);
                if (d < minDist) {
                    x = xx;
                    minDist = d;
                }
            }
        }

        //alert("x = " + x);
        return x;
    };

/// <summary>
/// Searching the suitable position on the center line of prefered location.
/// </summary>
    let SearchCenterLine = function (w, hh, centerEventIndex, center) {
        //alert("SearchCenterLine");
        let e = events[centerEventIndex];
        let intervals = e.upIntervals.slice();

        let upFeasible = false, downFeasible = false;

        // up search the span lines
        for (let j = centerEventIndex - 1; j >= 0; j--) {
            //alert("0e.y - events[j].y = " + (e.y - events[j].y));
            //alert("hh = " + hh);
            if (e.y - events[j].y >= hh) {
                //alert("upFeasible = true;");
                upFeasible = true;
                break;
            }
            else {
                IntersectInterval(intervals, events[j].upIntervals);
            }
        }

        // down search
        for (let j = centerEventIndex; j < events.length; j++) {
            if (events[j].y - e.y >= hh) {
                //alert("downFeasible = true;");
                downFeasible = true;
                break;
            }
            else {
                IntersectInterval(intervals, events[j].downIntervals);
            }
        }

        //up and down are both feasible
        if (upFeasible && downFeasible) {
            let x = FillInterval(intervals, w, center.X);
            if (-Infinity !== x) {
                return x;
            }
        }
        return Infinity;
    };

/// <summary>
/// Update Interval by filled with the rect at x
/// </summary>
    let UpdateInterval = function (interval, w, x) {
        //alert("UpdateInterval");
        let hw = w / 2;

        for (let i = 0; i < interval.length; i += 2) {
            let s = interval[i];
            let t = interval[i + 1];

            if (s < x && t > x) {
                interval.splice(i, 2);

                let ii = i;

                //there is space in the left
                if (x - s - hw > alignTolerance) {
                    interval.splice(ii++, 0, s);
                    interval.splice(ii++, 0, x - hw);
                }

                //there is space in the right
                if (t - x - hw > alignTolerance) {
                    interval.splice(ii++, 0, x + hw);
                    interval.splice(ii++, 0, t);
                }
                break;
            }
        }
    };

/// <summary>
/// Update the interval array and marked the rectangle region as forbidden.
/// </summary>
    let UpdateEvent = function (x, eIndex, width, height, direction) {
        //alert("UpdateEvent");
        let curEvent = events[eIndex];
        let h = (0 === direction) ? height / 2 : height;

        if (1 === direction || 0 === direction) {
            // Up direciton Search
            let newY = curEvent.y - h;
            let updateIndex = eIndex - 1;
            while (newY < events[updateIndex].y - alignTolerance) {
                let e = events[updateIndex];
                UpdateInterval(e.downIntervals, width, x);
                updateIndex--;
            }

            if (newY < events[updateIndex].y + alignTolerance) {
                UpdateInterval(events[updateIndex].downIntervals, width, x);
            }
            else {
                let lastEvent = events[updateIndex + 1];
                let upInterval = lastEvent.upIntervals;

                let newEvent = new SegEvent(newY);
                let newInterval = upInterval.slice();

                UpdateInterval(newInterval, width, x);
                lastEvent.upIntervals = newInterval;
                newEvent.downIntervals = newInterval;
                newEvent.upIntervals = upInterval;

                // insert before the last event
                events.splice(updateIndex + 1, 0, newEvent);
            }
        }

        if (-1 === direction || 0 === direction) {
            // Down Search
            let newY = curEvent.y + h;
            let updateIndex = eIndex + 1;

            while (newY > events[updateIndex].y + alignTolerance) {
                let e = events[updateIndex];
                UpdateInterval(e.upIntervals, width, x);
                updateIndex++;
            }

            if (newY > events[updateIndex].y - alignTolerance) {
                UpdateInterval(events[updateIndex].upIntervals, width, x);
            }
            else {
                let lastEvent = events[updateIndex - 1];
                let downInterval = lastEvent.downIntervals;

                let newEvent = new SegEvent(newY);
                let newInterval = downInterval.slice();

                UpdateInterval(newInterval, width, x);
                lastEvent.downIntervals = newInterval;
                newEvent.upIntervals = newInterval;
                newEvent.downIntervals = downInterval;

                events.splice(updateIndex, 0, newEvent);
            }
        }
    };

/// <summary>
/// Layout keyword according to the segment event.
/// </summary>
/// <param name="rects">the boundary of keyword</param>
/// <param name="displaced">whether the rectangle is placed</param>
/// <param name="prefers">prefered location for each rectangle</param>
    let PlaceRectangles = function (rects, displaced, prefers) {
        //alert("PlaceRectangles");
        for (let i = 0; i < rects.length; i++) {
            if (!displaced) {
                continue;
            }
            //alert("rects[i].Width = " + rects[i].Width);
            let w = rects[i].Width;
            let h = rects[i].Height;
            let hw = w / 2;
            let hh = h / 2;

            let center = prefers[i];
            let centerEventIndex = GeneratePreferSegEvent(prefers[i].Y);
            //alert("centerEventIndex = " + centerEventIndex);

            let yIndex = -1;
            let xCoor = Infinity;
            let minDist = Infinity;
            let direction = 0;

            xCoor = SearchCenterLine(w, hh, centerEventIndex, center);
            if (Infinity !== xCoor) {
                minDist = Math.abs((xCoor - center.X) / ellipseRatio);
                yIndex = centerEventIndex;
            }

            let upCnt = centerEventIndex, downCnt = centerEventIndex;

            let upDy = Math.abs(center.Y - (events[upCnt].y - hh));
            let downDy = Math.abs(events[downCnt].y + hh - center.Y);

            do {
                let upSearch;
                if (-1 === upCnt) {
                    upSearch = false;
                }
                else if (downCnt === events.length) {
                    upSearch = true;
                }
                else {
                    upDy = Math.abs(center.Y - (events[upCnt].y - hh));
                    downDy = Math.abs((events[downCnt].y + hh - center.Y));
                    upSearch = upDy < downDy;
                }

                // search region exceed the border.
                let dy = upSearch ? upDy : downDy;
                if (dy >= minDist || dy >= maxTolDist) {
                    break;
                }

                let e = new SegEvent(-1);
                if (upSearch) {
                    // up search
                    e = events[upCnt];
                    if (e.y - events[0].y < h) {
                        upCnt = -1;
                        continue;
                    }

                    let intervals = e.upIntervals.slice();

                    for (let j = upCnt - 1; j >= 0; j--) {
                        if (e.y - events[j].y >= h) {
                            break;
                        }
                        else {
                            IntersectInterval(intervals, events[j].upIntervals);
                        }
                    }
                    let x = FillInterval(intervals, w, center.X);
                    if (-Infinity !== x) {
                        let y = e.y - hh;

                        let d = Math.sqrt((x - center.X) / ellipseRatio
                            * (x - center.X) / ellipseRatio + (y - center.Y)
                            * (y - center.Y));
                        if (d < minDist) {
                            minDist = d;
                            yIndex = upCnt;
                            xCoor = x;
                            direction = 1;
                        }
                    }
                    upCnt--;
                }
                else {
                    // down search
                    e = events[downCnt];
                    if (events[events.length - 1].y - e.y < h) {
                        downCnt = events.length;
                        continue;
                    }

                    let intervals = e.downIntervals.slice();

                    for (let j = downCnt + 1; j < events.length; j++) {
                        if (events[j].y - e.y >= h) {
                            break;
                        }
                        else {
                            IntersectInterval(intervals, events[j].downIntervals);
                        }
                    }

                    let x = FillInterval(intervals, w, center.X);
                    if (-Infinity !== x) {
                        let y = e.y + hh;

                        let d = Math.sqrt((x - center.X) / ellipseRatio
                            * (x - center.X) / ellipseRatio + (y - center.Y)
                            * (y - center.Y));
                        if (d < minDist) {
                            minDist = d;
                            yIndex = downCnt;
                            xCoor = x;
                            direction = -1;
                        }
                    }
                    downCnt++;
                }
            } while (upCnt >= 0 || downCnt < events.length);

            //succeed to place the rectangles
            if (-1 !== yIndex && minDist < maxTolDist) {
                displaced[i] = true;
                let x = xCoor - hw;
                let y = (0 === direction) ? center.Y - hh
                    : (1 === direction ? events[yIndex].y - h : events
                        [yIndex].y);
                rects[i].X = x;
                rects[i].Y = y;

                UpdateEvent(xCoor, yIndex, rects[i].Width, rects[i].Height, direction);
            }

            //fail to place the rectangles
            else {
                displaced[i] = false;
            }
        }
    };

    exports.select = select;
})));
