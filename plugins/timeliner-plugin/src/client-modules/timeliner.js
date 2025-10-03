import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import * as paper from 'paper';
import { ToastContainer, toast } from 'react-toastify';
import RangeSlider from 'react-range-slider-input';
import 'react-toastify/dist/ReactToastify.css';
import 'react-range-slider-input/dist/style.css';
import {
  Cross2Icon,
  CopyIcon,
  DownloadIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons';
import { testXml } from '@site/src/components/XmlTest';
import prpro from '@site/static/img/timeliner/TimelinePremierePro.png';
import prproexport from '@site/static/img/timeliner/TimelinePremiereProExport.png';
import timelinerui from '@site/static/img/timeliner/TimelinerUI.png';
import Details from '@theme/Details';

// Constants
const CANVAS_SIZE = [1920, 1080];
const TIMELINE_WIDTH = 0.95 * CANVAS_SIZE[0];
const BLOCK_HEIGHT = 50;
const FONT_SIZE = 16;
const SUBTITLE_FONT_SIZE = 21;
const TITLE_FONT_SIZE = 32;
const BEAT_HEIGHT = SUBTITLE_FONT_SIZE + 2 * 4;
const FONT_FAMILY = 'Segoe UI';
const FONT_COLOR = '#404040';
const DEFAULT_COLORS = [
  '#067bc2',
  '#84BCDA',
  '#ECC30B',
  '#F37748',
  '#D56062',
  '#654236',
  '#2CDA9D',
];

// Utility functions
async function exportFile(blob, fileHandleOptions) {
  const fileHandle = await window.showSaveFilePicker(fileHandleOptions);
  const writable = await fileHandle.createWritable();
  await writable.write(blob);
  await writable.close();
}

function secondsToFormattedText(timeInSeconds) {
  let seconds = Math.round(timeInSeconds % 60);
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${Math.floor(timeInSeconds / 60)}:${seconds}`;
}

function componentToHex(c) {
  var hex = Math.floor(c).toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function randomColor(index) {
  if (index < DEFAULT_COLORS.length) {
    return DEFAULT_COLORS[index];
  }

  const col = new paper.Color.random();
  return rgbToHex(col.red * 255, col.green * 255, col.blue * 255);
}

function itemIntersectsGroup(item = new paper.Item(), group = new paper.Group()) {
  for (let i = 0; i < group.children.length; i++) {
    const child = group.children[i];

    if (item.intersects(child)) {
      return true;
    }
  }

  return false;
}

function Tutorial() {
  return (
    <Details summary="How to create a timeline with Timeliner" className="tutorial">
      <p>Cut your video and distribute clips between tracks by type:</p>
      <img src={prpro} alt="Premiere Pro timeline" />
      <br />
      <p>
        With the sequence in focus, export it thanks to{' '}
        <i>
          File{'>'}Export{'>'}Final Cut Pro XML...
        </i>
        :
      </p>
      <img src={prproexport} alt="Premiere Pro export" />
      <br />
      <p>Import the .xml file in Timeliner and create your timeline:</p>
      <img src={timelinerui} alt="Timeliner tool" />
    </Details>
  );
}

export function Timeliner() {
  if ( typeof window === 'undefined' ) {
    return null;
  }

  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const paperLayerRef = useRef(null);
  const [resizeCanvas, setResizeCanvas] = useState(false);
  const [filename, setFilename] = useState('');
  const [fileEntered, setFileEntered] = useState(false);
  const [file, setFile] = useState('');
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [displayOptions, setDisplayOptions] = useState(true);

  const [canvasHeight, setCanvasHeight] = useState(1080);
  const [sequenceBeats, setSequenceBeats] = useState([]);
  const [sequenceBlocks, setSequenceBlocks] = useState([]);
  const [sequenceBlocksInfo, setSequenceBlocksInfo] = useState([]);
  const [sequenceDuration, setSequenceDuration] = useState(600);
  const [sequenceTimebase, setSequenceTimebase] = useState(30);
  const [sequenceName, setSequenceName] = useState('Sequence Name');
  const [displayTimingInfo, setDisplayTimingInfo] = useState(true);
  const [displayPercentageInfo, setDisplayPercentageInfo] = useState(true);
  const [renderBackground, setRenderBackground] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [baseColor, setBaseColor] = useState(FONT_COLOR);

  function readFile(e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    const name = file.name.split('.');

    if (name[name.length - 1] == 'xml') {
      reader.onload = function (event) {
        const txt = event.target.result;

        setFilename(file.name);
        setFileEntered(true);
        setFile(txt);
      };
    } else {
      toast.error('Import failed: Not an xml file!');
      console.error('Import failed: Not an xml file!');
    }
    reader.readAsText(file);
  }

  function parseXml(text = testXml) {
    const parser = new DOMParser();
    const t = parser.parseFromString(text, 'application/xml');

    const sequenceXml = t.getElementsByTagName('sequence')[0];

    if (sequenceXml == undefined) {
      return;
    }

    // GET DURATION AND TIMEBASE
    for (let i = 0; i < sequenceXml.children.length; i++) {
      const child = sequenceXml.children[i];

      if (child.tagName === 'rate') {
        const timebase = child.getElementsByTagName('timebase')[0];
        setSequenceTimebase(_.toInteger(timebase.textContent));
        continue;
      }

      if (child.tagName === 'duration') {
        setSequenceDuration(_.toInteger(child.textContent));
        continue;
      }

      if (child.tagName === 'name') {
        setSequenceName(child.textContent);
        continue;
      }
    }

    // GET VIDEO TRACKS
    const video = sequenceXml.getElementsByTagName('video')[0];
    const tracks = video.getElementsByTagName('track');

    // fill blocks
    const blocks = [];
    const blocksDuration = Array(tracks.length).fill(0);
    const blocksNames = Array(tracks.length).fill('');
    const indices = [];

    for (let i = 0; i < tracks.length; i++) {
      const name = tracks[i].getAttribute('MZ.TrackName');
      if (name != null && name != '') {
        blocksNames[i] = name;
      }

      // get all clip items
      let blockTotalDuration = 0;
      const blockItems = [];

      const clipItems = tracks[i].getElementsByTagName('clipitem');
      for (let j = 0; j < clipItems.length; j++) {
        const item = clipItems[j];
        const inElement = item.getElementsByTagName('start')[0];
        const outElement = item.getElementsByTagName('end')[0];
        const inInt = _.toInteger(inElement.textContent);
        const outInt = _.toInteger(outElement.textContent);
        blockTotalDuration += outInt - inInt;
        blockItems.push([inInt, outInt]);
      }

      blocksDuration[i] = blockTotalDuration;

      if (blockItems.length != 0) {
        blocks.push(blockItems);
        indices.push(i);
      }
    }

    const blocksInfo = [];
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      blocksInfo.push({
        // initialize sequence block colors with random colors
        color: randomColor(idx),
        // initialize sequence block names with default names
        name: blocksNames[idx] == '' ? `Block ${i}` : blocksNames[idx],
        duration: blocksDuration[idx],
        blockIndex: i,
      });
    }

    setSequenceBlocksInfo(blocksInfo);
    setSequenceBlocks(blocks);
  }

  async function exportCanvas() {
    const optsImg = {
      suggestedName: sequenceName,
      types: [
        {
          description: 'Image file',
          accept: { 'image/png': ['.png'] },
        },
      ],
    };

    canvasRef.current.toBlob((blob) => exportFile(blob, optsImg));
  }

  async function copyCanvas() {
    canvasRef.current.toBlob((blob) => {
      const copyPromise = navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toast.promise(copyPromise, {
        pending: 'In Progress',
        success: 'Canvas copied to clipboard 👌',
        error: 'Unfortunate error 🤯',
      });
    });
  }

  function resetInput() {
    inputRef.current.value = '';
    setFileEntered(false);
    setSequenceBlocks([]);
    setSequenceBeats([]);
    setSequenceBlocksInfo([]);
    setSequenceDuration(600);
    setSequenceTimebase(30);
    setSequenceName('Sequence Name');
    setFile('');
    setFilename('');
  }

  function drawTimeline() {
    paperLayerRef.current.removeChildren();

    const sequenceTime = sequenceDuration / sequenceTimebase;
    const tenSecondsTicksCount = 1 + Math.floor(sequenceTime / 10);
    const secondWidth = TIMELINE_WIDTH / sequenceTime;

    ////////////////////////////////
    /////// DRAW BACKGROUND ////////
    ////////////////////////////////
    const bg = new paper.Shape.Rectangle({
      name: 'background',
      point: [0, 0],
      size: [CANVAS_SIZE[0], CANVAS_SIZE[1]],
      fillColor: bgColor,
      visible: renderBackground,
    });

    ////////////////////////////////
    /////// DRAW TITLE /////////////
    ////////////////////////////////
    const titleGroup = new paper.Group();
    titleGroup.name = 'title';
    const title = new paper.PointText({
      point: [0, 0],
      content: `${sequenceName}${
        displayTimingInfo ? ` - ${secondsToFormattedText(Math.floor(sequenceTime))}` : ''
      }`,
      fillColor: baseColor,
      fontSize: TITLE_FONT_SIZE,
      fontWeight: 'bold',
      fontFamily: FONT_FAMILY,
    });
    title.position.y = title.bounds.height * 0.5 + 20;
    title.position.x = (CANVAS_SIZE[0] - TIMELINE_WIDTH) * 0.5 + title.bounds.width * 0.5;

    titleGroup.addChildren([title]);

    ////////////////////////////////
    /////// DRAW BEATS /////////////
    ////////////////////////////////
    const finalBeatsGroup = new paper.Group();
    finalBeatsGroup.name = 'final-beats';
    const beatsGroup = new paper.Group();
    beatsGroup.name = 'beats';
    for (let i = 0; i < 5; i++) {
      const rect = new paper.Shape.Rectangle({
        point: [0, 0],
        size: [TIMELINE_WIDTH, BEAT_HEIGHT],
        fillColor: '#909090',
      });
      rect.position.x = CANVAS_SIZE[0] / 2;
      rect.position.y =
        title.position.y + title.bounds.height / 2 + 20 + i * (rect.bounds.height + 5);
      beatsGroup.addChild(rect);
    }

    ////////////////////////////////
    /////// DRAW TIMELINE //////////
    ////////////////////////////////
    const timelineGroup = new paper.Group();
    timelineGroup.name = 'timeline';
    const line = new paper.Path({
      segments: [
        [0, 0],
        [TIMELINE_WIDTH, 0],
      ],
      strokeColor: baseColor,
      strokeWidth: 4,
      name: 'line',
    });
    line.position = new paper.Point(CANVAS_SIZE[0] / 2, 0);
    timelineGroup.addChild(line);

    const tickStartPosition = line.position.subtract([TIMELINE_WIDTH / 2, 0]);
    for (let i = 0; i < tenSecondsTicksCount; i++) {
      const h = i % 6 ? 5 : 10;
      const tick = new paper.Path({
        segments: [
          [0, h],
          [0, -h],
        ],
        strokeColor: baseColor,
        strokeWidth: i % 6 ? 2 : 4,
      });
      tick.position = tickStartPosition.add([i * 10 * secondWidth, 0]);
      timelineGroup.addChild(tick);

      if (!(i % 6)) {
        const text = new paper.PointText({
          point: [50, 50],
          content: secondsToFormattedText(i * 10),
          fillColor: baseColor,
          fontFamily: FONT_FAMILY,
          fontWeight: 'bold',
          fontSize: FONT_SIZE,
        });
        text.position = tick.position.subtract([0, tick.bounds.height / 2 + FONT_SIZE / 2 + 3]);
        timelineGroup.addChild(text);
      }
    }

    timelineGroup.position.y += beatsGroup.position.y + beatsGroup.bounds.height / 2 + 36;
    beatsGroup.visible = false;
  }

  function drawBlocks() {
    const sequenceTime = sequenceDuration / sequenceTimebase;
    const secondWidth = TIMELINE_WIDTH / sequenceTime;

    const timelinePosition = paperLayerRef.current.children['timeline'].children['line'].position;

    const blockStartPosition = new paper.Point(
      timelinePosition.x - TIMELINE_WIDTH / 2,
      timelinePosition.y
    );

    const blocksGroup = new paper.Group();
    blocksGroup.name = 'blocks';
    const textGroup = new paper.Group();

    for (let i = 0; i < sequenceBlocks.length; i++) {
      const track = sequenceBlocks[i];
      let color = '';
      for (let j = 0; j < sequenceBlocksInfo.length; j++) {
        if (sequenceBlocksInfo[j].blockIndex == i) {
          color = sequenceBlocksInfo[j].color;
          break;
        }
      }

      const blockGroup = new paper.Group();

      for (let j = 0; j < track.length; j++) {
        const blockInOut = track[j];

        const time = (blockInOut[1] - blockInOut[0]) / sequenceTimebase;

        const block = new paper.Shape.Rectangle({
          point: blockStartPosition.add([(blockInOut[0] / sequenceTimebase) * secondWidth, 15]),
          size: [secondWidth * time, BLOCK_HEIGHT],
          fillColor: color,
          strokeWidth: 0,
        });

        const text = new paper.PointText({
          point: [0, 0],
          content: secondsToFormattedText(time),
          fillColor: color,
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZE,
          strokeWidth: 0,
        });
        text.position = block.position.add([0, BLOCK_HEIGHT / 2 + FONT_SIZE]);

        const textBox = new paper.Shape.Rectangle({
          point: [0, 0],
          size: text.bounds.size,
          fillColor: 'grey',
        });
        textBox.position = text.position;

        while (textGroup.children.length > 0 && itemIntersectsGroup(textBox, textGroup)) {
          textBox.position.y += textBox.bounds.height / 4;
          text.position.y += textBox.bounds.height / 4;
        }
        textGroup.addChild(textBox);

        const line = new paper.Path({
          segments: [block.position, text.position.subtract([0, text.bounds.height / 2])],
          strokeColor: color,
          strokeWidth: 1,
        });

        blockGroup.addChildren([block, line, text]);
      }

      blocksGroup.addChild(blockGroup);
    }

    textGroup.remove();
  }

  function drawBlocksLegend(blocksInfo = sequenceBlocksInfo) {
    const blocksGroup = paperLayerRef.current.children['blocks'];

    const blocksLegendGroup = new paper.Group();
    blocksLegendGroup.name = 'legend';

    for (let i = 0; i < blocksInfo.length; i++) {
      const color = blocksInfo[i].color;
      const name = blocksInfo[i].name;
      const duration = Math.floor(blocksInfo[i].duration / sequenceTimebase);
      const percentage = Math.round((100 * blocksInfo[i].duration) / sequenceDuration);

      const group = new paper.Group();
      const rect = new paper.Shape.Rectangle({
        point: [(CANVAS_SIZE[0] - TIMELINE_WIDTH) * 0.5, 0],
        size: [50, SUBTITLE_FONT_SIZE],
        fillColor: color,
      });
      rect.position.y =
        blocksGroup.position.y +
        blocksGroup.bounds.height * 0.5 +
        rect.bounds.height * (0.5 + i) +
        16 * i +
        30;

      const text = new paper.PointText({
        point: [0, 0],
        content: `${name}${displayTimingInfo ? ` - ${secondsToFormattedText(duration)}` : ''}${
          displayPercentageInfo ? ` - ${percentage}%` : ''
        }`,
        fontFamily: FONT_FAMILY,
        fontSize: SUBTITLE_FONT_SIZE,
        fillColor: baseColor,
        fontWeight: 'bold',
      });
      text.position.x = rect.position.x + rect.bounds.width * 0.5 + text.bounds.width * 0.5 + 10;
      text.position.y = rect.position.y + 2;

      group.addChildren([rect, text]);
      blocksLegendGroup.addChild(group);
    }
  }

  function updateTitleText(value = sequenceName) {
    const duration = Math.floor(sequenceDuration / sequenceTimebase);

    const titleGroup = paperLayerRef.current.children['title'];

    if (titleGroup != undefined) {
      const title = paperLayerRef.current.children['title'].children[0];
      title.content = `${value}${
        displayTimingInfo ? ` - ${secondsToFormattedText(duration)}` : ''
      }`;

      title.position.x = (CANVAS_SIZE[0] - TIMELINE_WIDTH) * 0.5 + title.bounds.width * 0.5;
    }
  }

  function updateBlockLegendText(index, name) {
    const duration = Math.floor(sequenceBlocksInfo[index].duration / sequenceTimebase);
    const percentage = Math.round((100 * sequenceBlocksInfo[index].duration) / sequenceDuration);

    const legendGroup = paperLayerRef.current.children['legend'].children[index];
    const rect = legendGroup.children[0];
    const text = legendGroup.children[1];
    text.content = `${name}${displayTimingInfo ? ` - ${secondsToFormattedText(duration)}` : ''}${
      displayPercentageInfo ? ` - ${percentage}%` : ''
    }`;

    text.position.x = rect.position.x + rect.bounds.width * 0.5 + text.bounds.width * 0.5 + 10;
  }

  function handleBlockInfoModification(index, propertyName, value) {
    setSequenceBlocksInfo(
      sequenceBlocksInfo.map((blockInfo, i) => {
        if (i === index) {
          return { ...blockInfo, [propertyName]: value };
        } else {
          return blockInfo;
        }
      })
    );

    switch (propertyName) {
      case 'color':
        const bIndex = sequenceBlocksInfo[index].blockIndex;
        const blocksGroup = paperLayerRef.current.children['blocks'];
        blocksGroup.children[bIndex].fillColor = value;
        blocksGroup.children[bIndex].strokeColor = value;

        const legendGroup = paperLayerRef.current.children['legend'].children[index];
        const rect = legendGroup.children[0];
        rect.fillColor = value;
        break;
      case 'name':
        updateBlockLegendText(index, value);
        break;
      default:
        break;
    }
  }

  function handleBlockIndexChange(index, newIndex) {
    const tmp1 = sequenceBlocksInfo[index];
    const tmp2 = sequenceBlocksInfo[newIndex];
    const newSequenceBlocksInfo = sequenceBlocksInfo.map((blockInfo, i) => {
      if (i === index) {
        return tmp2;
      } else if (i === newIndex) {
        return tmp1;
      } else {
        return blockInfo;
      }
    });
    setSequenceBlocksInfo(newSequenceBlocksInfo);

    const legendGroup = paperLayerRef.current.children['legend'];
    legendGroup.remove();
    drawBlocksLegend(newSequenceBlocksInfo);
  }

  function handleBeatCreation() {
    const newId = `id-${_.uniqueId()}`;

    setSequenceBeats([
      ...sequenceBeats,
      {
        id: newId,
        type: 0,
        name: 'BEAT',
        fillColor: '#ffe100',
        textColor: baseColor,
        start: 0,
        end: Math.floor(sequenceDuration / sequenceTimebase),
      },
    ]);

    const beatsGroup = paperLayerRef.current.children['beats'];
    const finalBeatsGroup = paperLayerRef.current.children['final-beats'];

    const beatGroup = new paper.Group();
    beatGroup.name = newId;
    const rect = new paper.Shape.Rectangle({
      point: [0, 0],
      size: [TIMELINE_WIDTH, BEAT_HEIGHT],
      fillColor: '#ffe100',
    });
    const text = new paper.PointText({
      point: [0, 0],
      content: `BEAT${
        displayTimingInfo
          ? ` - ${secondsToFormattedText(Math.floor(sequenceDuration / sequenceTimebase))}`
          : ''
      }${displayPercentageInfo ? ` - 100%` : ''}`,
      fillColor: baseColor,
      fontSize: SUBTITLE_FONT_SIZE,
      fontWeight: 'bold',
    });
    rect.position.x = CANVAS_SIZE[0] / 2;
    rect.position.y = beatsGroup.children[4].position.y;
    text.position = rect.position;
    beatGroup.addChildren([rect, text]);
    finalBeatsGroup.addChild(beatGroup);
    beatGroup.sendToBack();
  }

  function handleBeatDeletion(index) {
    const id = sequenceBeats[index].id;
    setSequenceBeats(sequenceBeats.filter((beat) => beat.id != id));

    const finalBeatsGroup = paperLayerRef.current.children['final-beats'];
    finalBeatsGroup.children[id].remove();
  }

  function updateBeatType(beat, type) {
    const finalBeatsGroup = paperLayerRef.current.children['final-beats'];
    const beatsGroup = paperLayerRef.current.children['beats'];
    finalBeatsGroup.children[beat.id].position.y = beatsGroup.children[4 - type].position.y;
  }

  function updateBeatRange(beat, start, end) {
    const sequenceTime = sequenceDuration / sequenceTimebase;
    const secondWidth = TIMELINE_WIDTH / sequenceTime;
    const timelinePosition = paperLayerRef.current.children['timeline'].children['line'].position;

    const startPosition = timelinePosition.x - TIMELINE_WIDTH / 2;

    const finalBeatsGroup = paperLayerRef.current.children['final-beats'];
    const beatGroup = finalBeatsGroup.children[beat.id];

    beatGroup.children[0].size.width = (end - start) * secondWidth;
    beatGroup.children[0].position.x =
      startPosition + start * secondWidth + beatGroup.children[0].size.width / 2;

    const time = end - start;
    const percentage = Math.round((100 * time) / sequenceTime);

    beatGroup.children[1].content = `${beat.name}${
      displayTimingInfo ? ` - ${secondsToFormattedText(time)}` : ''
    }${displayPercentageInfo ? ` - ${percentage}%` : ''}`;

    beatGroup.children[1].position.x = beatGroup.children[0].position.x;
  }

  function updateBeatName(beat, name) {
    const finalBeatsGroup = paperLayerRef.current.children['final-beats'];
    const beatGroup = finalBeatsGroup.children[beat.id];

    const sequenceTime = sequenceDuration / sequenceTimebase;
    const time = beat.end - beat.start;
    const percentage = Math.round((100 * time) / sequenceTime);

    beatGroup.children[1].content = `${name}${
      displayTimingInfo ? ` - ${secondsToFormattedText(time)}` : ''
    }${displayPercentageInfo ? ` - ${percentage}%` : ''}`;
    beatGroup.children[1].position.x = beatGroup.children[0].position.x;
  }

  function updateBeatColors(beat, fillColor, textColor) {
    const finalBeatsGroup = paperLayerRef.current.children['final-beats'];
    const beatGroup = finalBeatsGroup.children[beat.id];

    beatGroup.children[0].fillColor = fillColor;
    beatGroup.children[1].fillColor = textColor;
  }

  function handleBeatModification(index, propertyName, value) {
    setSequenceBeats(
      sequenceBeats.map((beat, i) => {
        if (i === index) {
          return { ...beat, [propertyName]: value };
        } else {
          return beat;
        }
      })
    );

    const beat = sequenceBeats[index];

    switch (propertyName) {
      case 'type':
        updateBeatType(beat, value);
        break;
      case 'start':
        updateBeatRange(beat, value, beat.end);
        break;
      case 'end':
        updateBeatRange(beat, beat.start, value);
        break;
      case 'name':
        updateBeatName(beat, value);
        break;
      case 'fillColor':
        updateBeatColors(beat, value, beat.textColor);
        break;
      case 'textColor':
        updateBeatColors(beat, beat.fillColor, value);
        break;
      default:
        break;
    }
  }

  function handleSequenceNameChange(value) {
    setSequenceName(value);
    updateTitleText(value);
  }

  function fileInputWidget() {
    return (
      <div className="Timeliner-App-input">
        {fileEntered ? (
          <div>
            <span style={{ marginRight: 8 }}>{filename}</span>
            <button onClick={resetInput} className="reset-button">
              <Cross2Icon />
            </button>
          </div>
        ) : (
          <>
            <label htmlFor="xml">Choose an XML file:</label>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          id="xml"
          name="xml"
          accept=".xml"
          onInput={readFile}
          style={{ visibility: fileEntered ? 'hidden' : 'visible' }}
        />
      </div>
    );
  }

  function displayOptionsWidget() {
    return (
      <fieldset className="display-options">
        <legend>Display Options</legend>

        <div className="option">
          <label htmlFor="size">Preview size</label>
          <input
            type="range"
            id="size"
            name="size"
            step={2}
            min={CANVAS_SIZE[0] / 4}
            max={CANVAS_SIZE[0]}
            value={canvasWidth}
            onChange={(event) => setCanvasWidth(event.currentTarget.value)}
          />
        </div>
        <div className="option">
          <label htmlFor="display-options">Properties</label>
          <input
            type="checkbox"
            id="checkbox"
            name="display-options"
            checked={displayOptions}
            onChange={(e) => setDisplayOptions(e.currentTarget.checked)}
          />
        </div>
      </fieldset>
    );
  }

  useEffect(() => {
    paper.setup(canvasRef.current);
    setResizeCanvas(true);
    paperLayerRef.current = new paper.Layer();
  }, []);

  useEffect(() => {
    if (file !== '') {
      parseXml(file);
    }
  }, [file]);

  useEffect(() => {
    if (sequenceBlocks.length != 0) {
      drawTimeline();
      drawBlocks();
      drawBlocksLegend();
    }
  }, [sequenceBlocks, canvasHeight]);

  useEffect(() => {
    for (let i = 0; i < sequenceBlocksInfo.length; i++) {
      updateBlockLegendText(i, sequenceBlocksInfo[i].name);
    }
    for (let i = 0; i < sequenceBeats.length; i++) {
      updateBeatName(sequenceBeats[i], sequenceBeats[i].name);
    }
    updateTitleText();
  }, [displayTimingInfo, displayPercentageInfo]);

  useEffect(() => {
    const bg = paperLayerRef.current.children['background'];

    if (paperLayerRef.current != null && bg != undefined) {
      bg.fillColor = bgColor;
      bg.visible = renderBackground;
    }
  }, [renderBackground, bgColor]);

  return (
    <div className="Timeliner-App">
      {fileEntered ? displayOptionsWidget() : <></>}
      <div className="base">
        {fileEntered ? <></> : <Tutorial />}
        {fileInputWidget()}
        {fileEntered ? (
          <div className="export-buttons">
            <button onClick={exportCanvas}>
              <DownloadIcon /> Save As
            </button>
            <button onClick={copyCanvas}>
              <CopyIcon /> Copy to clipboard
            </button>
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            width: `${canvasWidth}px`,
            height: fileEntered ? 'auto' : '0',
            visibility: fileEntered ? 'visible' : 'hidden',
            marginBottom: 20,
            backgroundColor: '#eeeeee',
          }}
        >
          <canvas
            id="paper-canvas"
            className="paper-canvas"
            ref={canvasRef}
            width={CANVAS_SIZE[0]}
            height={canvasHeight}
            style={
              resizeCanvas
                ? { width: '100%', maxWidth: `${CANVAS_SIZE[0]}px` }
                : { maxWidth: `${CANVAS_SIZE[0]}px` }
            }
          ></canvas>
        </div>
      </div>

      {fileEntered ? (
        <div
          className="timeline-options"
          style={{ visibility: displayOptions ? 'visible' : 'hidden' }}
        >
          <div className="fieldset-container">
            <fieldset className="options-container">
              <legend>General</legend>
              <div className="option-container">
                <div className="option">
                  <select
                    name="height"
                    id="height-select"
                    onChange={(e) => setCanvasHeight(_.toInteger(e.currentTarget.value))}
                    value={canvasHeight}
                  >
                    <option value="1080">1920x1080</option>
                    <option value="960">1920x960</option>
                    <option value="840">1920x840</option>
                    <option value="720">1920x720</option>
                    <option value="600">1920x600</option>
                  </select>
                </div>
                <div className="option">
                  <input
                    type="text"
                    id="name"
                    name="sequence-name"
                    className="text-input"
                    value={sequenceName}
                    onChange={(e) => handleSequenceNameChange(e.currentTarget.value)}
                  />
                </div>
                <div className="option">
                  <label htmlFor="show-timing">Time Info</label>
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="show-timing"
                    checked={displayTimingInfo}
                    onChange={(e) => setDisplayTimingInfo(e.currentTarget.checked)}
                  />
                </div>
                <div className="option">
                  <label htmlFor="show-%">% Info</label>
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="show-timing"
                    checked={displayPercentageInfo}
                    onChange={(e) => setDisplayPercentageInfo(e.currentTarget.checked)}
                  />
                </div>
                <div className="option" style={{ alignItems: 'center' }}>
                  <label htmlFor="render-bg">Background</label>
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="render-bg"
                    checked={renderBackground}
                    onChange={(e) => setRenderBackground(e.currentTarget.checked)}
                  />
                  <input
                    type="color"
                    id="color"
                    name="render-bg"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.currentTarget.value)}
                    style={{ marginLeft: 2 }}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="blocks-container">
              <legend>Blocks</legend>

              <div className="option-container">
                {sequenceBlocksInfo.map((blockInfo, i) => (
                  <div className="option" key={`block-${i}`}>
                    <input
                      type="color"
                      id="color"
                      name="color"
                      value={blockInfo.color}
                      onChange={(e) =>
                        handleBlockInfoModification(i, 'color', e.currentTarget.value)
                      }
                    />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="text-input"
                      value={blockInfo.name}
                      onChange={(e) =>
                        handleBlockInfoModification(i, 'name', e.currentTarget.value)
                      }
                    />
                    <button disabled={i == 0} onClick={() => handleBlockIndexChange(i, i - 1)}>
                      <ChevronUpIcon />
                    </button>
                    <button
                      disabled={i == sequenceBlocks.length - 1}
                      onClick={() => handleBlockIndexChange(i, i + 1)}
                    >
                      <ChevronDownIcon />
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="beats-container">
              <legend>Beats</legend>

              <div className="option-container">
                {sequenceBeats.map((beat, i) => (
                  <div className="option" key={'beat-' + i}>
                    <div className="beat-container">
                      <div className="beat-line" style={{ alignItems: 'center', marginBottom: 5 }}>
                        <input
                          type="number"
                          id="start"
                          name="start"
                          min="0"
                          max={Math.floor(sequenceDuration / sequenceTimebase)}
                          value={beat.start}
                          onChange={(e) =>
                            handleBeatModification(i, 'start', e.currentTarget.valueAsNumber)
                          }
                          style={{ width: 60 }}
                        />
                        <input
                          type="number"
                          id="end"
                          name="end"
                          min="0"
                          max={Math.floor(sequenceDuration / sequenceTimebase)}
                          value={beat.end}
                          onChange={(e) =>
                            handleBeatModification(i, 'end', e.currentTarget.valueAsNumber)
                          }
                          style={{ width: 60 }}
                        />
                        <RangeSlider
                          id="range"
                          name="range"
                          min="0"
                          max={Math.floor(sequenceDuration / sequenceTimebase)}
                          value={[beat.start, beat.end]}
                          onInput={(e) => {
                            if (e[0] != beat.start) {
                              handleBeatModification(i, 'start', e[0]);
                            }
                            if (e[1] != beat.end) {
                              handleBeatModification(i, 'end', e[1]);
                            }
                          }}
                        />
                      </div>
                      <div className="beat-line">
                        <select
                          name="type"
                          id="type-select"
                          onChange={(e) =>
                            handleBeatModification(i, 'type', _.toInteger(e.currentTarget.value))
                          }
                          value={beat.type}
                        >
                          {Array(5)
                            .fill(0)
                            .map((_, j) => (
                              <option value={j} key={'type' + i + '-' + j}>
                                Track {j}
                              </option>
                            ))}
                        </select>
                        <input
                          type="color"
                          id="color"
                          name="color"
                          value={beat.fillColor}
                          onChange={(e) =>
                            handleBeatModification(i, 'fillColor', e.currentTarget.value)
                          }
                        />
                        <input
                          type="color"
                          id="color"
                          name="color"
                          value={beat.textColor}
                          onChange={(e) =>
                            handleBeatModification(i, 'textColor', e.currentTarget.value)
                          }
                        />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={beat.name}
                          onChange={(e) => handleBeatModification(i, 'name', e.currentTarget.value)}
                          style={{ flexGrow: 1 }}
                        />
                      </div>
                    </div>
                    <button onClick={() => handleBeatDeletion(i)} className="delete-button">
                      <Cross2Icon />
                    </button>
                  </div>
                ))}
              </div>

              <button className="create-beat" onClick={handleBeatCreation}>
                + Add beat
              </button>
            </fieldset>
          </div>
        </div>
      ) : (
        <></>
      )}

      <ToastContainer />
    </div>
  );
}
