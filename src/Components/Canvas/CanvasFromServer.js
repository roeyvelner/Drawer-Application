
import React, { Component } from 'react';
import { v4 } from 'uuid';
import Pusher from 'pusher-js';
import { convertToObject } from 'typescript';


class CanvasServer extends Component {
  userStrokeStyle = '#EE92C2';
  guestStrokeStyle = '#F0C987';

  constructor(props) {
    super(props);
    this.userStrokeStyle = props.color;
    // this.guestStrokeStyle = props.color;
    
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);

    this.pusher = new Pusher("391019a48d4bb91823a9", {
      cluster: 'ap2',
    });
  }
  
  isPainting = false;
  
  line = [];
  userId = v4();
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      this.position = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.line = this.line.concat(this.position);
      this.paint(this.prevPos, offSetData, this.userStrokeStyle);
    }
  }

  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.sendPaintData();
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  async sendPaintData() {
    const body = {
      line: this.line,
      userId: this.userId,
      userColor: this.userStrokeStyle,
      team: this.props.roomName,
    };

    const req = await fetch('http://drawserver-env.eba-kdm2hg7h.us-east-2.elasticbeanstalk.com/paint', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });
    const res = await req.json();
    this.line = [];
  }

  componentDidMount() {
    console.log("Start componentDidMount");
    // this.canvas.className="w-100 h-75"
    // this.canvas.classList="w-100 h-100";
    this.canvas.width = "900";
    this.canvas.height = "450";
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;

    const channel = this.pusher.subscribe('painting');
    channel.bind('draw', (data) => {
      console.log("Get Draw");
      const { userId, line,userColor,team } = data;
      if (userId !== this.userId  &&   team==this.props.roomName) {
        line.forEach((position) => {
          this.paint(position.start, position.stop, userColor);
        });
      }
    });
  }

  render() {
    this.userStrokeStyle = this.props.color;
    // this.guestStrokeStyle = this.props.color;
    return (
      <canvas
        ref={(ref) => (this.canvas = ref)}
        style={{ background: 'black'}}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
    );
  }
}

export default CanvasServer;