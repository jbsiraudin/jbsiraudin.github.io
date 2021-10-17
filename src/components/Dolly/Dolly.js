import React, { useRef, useState, useEffect } from "react";
import paper from "paper";
import useThemeContext from "@theme/hooks/useThemeContext";

const script = `
function drawAngle(center, angle, label, value) {
	var radius = 25, threshold = 10;
	var init = new Point(radius, 0);
	var from = init.rotate(-angle / 2)
	var through = from.rotate(angle / 2);
	var to = from.rotate(angle);
	var end = center + to;
	const line = new Path.Line({
	    from: center,
		to: center + new Point(radius + threshold, 0),
	    strokeColor: '#8b8b8b',
		fillColor: null,
		dashArray: [1, 2],
        strokeWidth: 1,
	});
	var arc = new Path.Arc({
        from: center + from,
        through: center + through,
        to: end,
        strokeColor: '#8b8b8b',
		fillColor: null,
		dashArray: [1, 2],
		strokeWidth: 1,
    });

	if (Math.abs(angle) > 15) {
		var arrowVector = to.normalize(7.5).rotate(angle < 0 ? -90 : 90);
		
		var path = new Path.Arc({
            segments: [
				end + arrowVector.rotate(135),
				end,
				end + arrowVector.rotate(-135)
		],
            strokeColor: '#8b8b8b',
    		fillColor: null,
    		dashArray: [1, 2]
        });
	};
	
	if (label) {
		// Angle Label
		var text = new PointText(center
				+ through.normalize(radius + 10) + new Point(0, -15));
		text.content = 'zoom: ' + value;
		text.fontSize = 12;
    text.fillColor = colReadable;
	}
	return true;
}

function drawLength(from, to, sign, label, value, prefix) {
	var lengthSize = 5;
	var vector = to - from;
	var awayVector = vector.normalize(lengthSize).rotate(90 * sign);
	var upVector = vector.normalize(lengthSize).rotate(45 * sign);
	var downVector = upVector.rotate(-90 * sign);
	var lengthVector = vector.normalize(
			vector.length / 2 - lengthSize * Math.sqrt(2));
	var line = new Path();
	line.add(from + awayVector);
	line.lineBy(upVector);
	line.lineBy(lengthVector);
	line.lineBy(upVector);
	var middle = line.lastSegment.point;
	line.lineBy(downVector);
	line.lineBy(lengthVector);
	line.lineBy(downVector);
	
	line.strokeColor= '#8b8b8b';
	line.fillColor= null;
	line.dashArray= [1, 2];

	if (label) {
		// Length Label
		var textAngle = Math.abs(vector.angle) > 90
				? textAngle = 180 + vector.angle : vector.angle;
		// Label needs to move away by different amounts based on the
		// vector's quadrant:
		var away = (sign >= 0 ? [1, 4] : [2, 3]).indexOf(vector.quadrant) != -1
				? 8 : 0;
		var text = new PointText({
			point: middle + awayVector.normalize(away + lengthSize),
			fontSize: 12,
			justification: 'center',
      fillColor: colReadable,
		});
		text.rotate(textAngle);
		value = value || vector.length;
		text.content = 'a: ' + (prefix || '') + Math.floor(value * 1000) / 1000;
	}
}

const w = 500;
const h = 250;


const aW = 3;
const aH = 3;
const zeroX = 0.6*w;


var sizeCam = 5;
var sizeH = 100;

function getTan(angle) {
    return Math.tan(angle * Math.PI / 180)
}

function drawCamera(position, fov, color, id) {
    const box = new Shape.Rectangle({
        from: position - [sizeCam, sizeCam],
        to: position + [sizeCam, sizeCam],
        fillColor: color,
        strokeWidth: 0
    });
    const line1 = new Path.Line({
        from: position,
        to: position + [sizeH/getTan(fov/2), sizeH],
        strokeColor: color
    })
    const line2 = new Path.Line({
        from: position,
        to: position + [sizeH/getTan(fov/2), -sizeH],
        strokeColor: color
    })
    const line3 = new Path.Line({
        from: position + [sizeH/getTan(fov/2), sizeH],
        to: position + [sizeH/getTan(fov/2), -sizeH],
        strokeColor: color
    });

    var text = new PointText({
        content: id,
        point: position + [0, 20],
        fontSize: 12,
        justification: 'center',
        fillColor: color,
    });
}

const fov = 60;
const zero = new Point(zeroX, h/2);

const axis = new Path.Line({
    from: [0, h/2],
    to: [w, h/2],
    strokeColor: colReadable,
    strokeWidth: 1,
});
const arrowAxis = new Path({
    segments: [[w-aW, h/2-aH], [w, h/2], [w-aW, h/2+aH]],
    fillColor: 'transparent',
    strokeColor: colReadable,
    strokeWidth: 1,
});

const segmentZero = new Path.Line({
    from: [zeroX, h/2-5],
    to: [zeroX, h/2+5],
    strokeColor: colReadable,
    strokeWidth: 1,
})

const cam1 = new Point(zeroX - 100, h/2);
const a = getTan(fov/2)/getTan(fov/(2*z));
const cam2 = new Point(zeroX - a*100, h/2);

drawCamera(cam1, fov, "red", "x0");
drawCamera(cam2, fov/z, "green", "x1");

drawLength(cam2 + [0, 40], zero + [0, 40], 1, true, a, "");
drawAngle(cam2, fov/z, true, z);
`;

const Dolly = () => {
  const [zoom, setZoom] = useState(0.75);
  const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext();
  const [colReadable, setColReadable] = useState("black");
  const canvasRef = useRef(null);

  function updateCanvas() {
    const codeToExecute = `
      const z = ${zoom};
      const colReadable = ${isDarkTheme ? "'white'" : "'black'"};
      ${script}
    `;
    paper.project.clear();
    paper.execute(codeToExecute);
  }

  useEffect(() => {
    paper.setup(canvasRef.current);
  }, []);

  useEffect(() => {
    updateCanvas();
  }, [zoom, isDarkTheme]);

  function onChangeZoom(e) {
    setZoom(e.target.valueAsNumber);
  }

  return (
    <div className="dolly">
      <div className="input-container">
        <div className="input">
          <p>z =</p>
          <input type="range" step="0.01" min="0.5" max="2" value={zoom} onChange={onChangeZoom} />
          <p>{zoom.toFixed(2)}</p>
        </div>
      </div>
      <canvas ref={canvasRef} width={500} height={250} />
    </div>
  );
};

export default Dolly;
