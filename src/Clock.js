import React, { Component } from 'react';


class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            break_length: 5,
            session_length: 25,
            timer_label: "Session",
            isRunning: false,
            intervalID: '',
            time_left: 1500
        }
        this.breakIncrement = this.breakIncrement.bind(this);
        this.breakDecrement = this.breakDecrement.bind(this);
        this.sessionIncrement = this.sessionIncrement.bind(this);
        this.sessionDecrement = this.sessionDecrement.bind(this);
        this.reset = this.reset.bind(this);
        this.isRunning = this.isRunning.bind(this);
        this.countDown = this.countDown.bind(this);
        this.timeControl = this.timeControl.bind(this);
        this.timeLeftDecrement = this.timeLeftDecrement.bind(this);
    }

    isRunning(){
        this.setState({
            isRunning: !this.state.isRunning
        })
        this.countDown();
    }

    timeControl(){
        this.timeLeftDecrement();

        if(this.state.time_left === 0){
            this.audioBeep.play();
        }

        if(this.state.time_left < 0 && this.state.timer_label === "Session"){
            this.setState({
                time_left: this.state.break_length * 60,
                timer_label: "Break"
            })
        } else if(this.state.time_left < 0 && this.state.timer_label === "Break"){
            this.setState({
                timer_label: "Session",
                time_left: this.state.session_length * 60
            })
        }
    }

    countDown(){
        if(!this.state.isRunning){
            this.setState({
                intervalID: setInterval(() => {
                    this.timeControl();
                }, 1000)
            })
        }
        if(this.state.isRunning) {
            this.setState({
                intervalID: ''
            })
            let clear = clearInterval(this.state.intervalID)
        }
    }

    timeLeftDecrement(){
        this.setState({
            time_left: this.state.time_left - 1
        })
    }

    breakIncrement(){
        if(this.state.break_length < 60){
            this.setState({
                break_length: this.state.break_length + 1
            });
        }
    }

    breakDecrement(){
        if(this.state.break_length > 1){
            this.setState({
                break_length: this.state.break_length - 1
            });
        }
    }

    sessionIncrement(){
        if(this.state.session_length < 60){
            this.setState({
                session_length: this.state.session_length + 1,
                time_left: (this.state.session_length + 1) * 60
            });
        }
    }

    sessionDecrement(){
        if(this.state.session_length > 1) {
            this.setState({
                session_length: this.state.session_length - 1,
                time_left: (this.state.session_length - 1) * 60
            });
        }
    }

    toTimeFomat(number){
        
        var mm = parseInt(number/60);
        var ss = number - mm * 60;
        if(ss < 10) ss = "0" + ss;
        if(mm < 10) mm = "0" + mm;
        return mm + ":" + ss;
    }

    reset(){
        this.setState({
            break_length: 5,
            timer_label: "Session",
            session_length: 25,
            time_left: 1500,
            isRunning: false
        });
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
    }
    
    render() {
        const {break_length, session_length, timer_label, time_left} = this.state;
        const styleTimeWrapper = time_left >= 60 ? {color: "white"} : {color: "rgb(165, 13, 13)"};
        const iconPause = this.state.isRunning? "fa fa-pause" : "fa fa-play";

        return (
            <div className="container">
                <h1>Pomodoro Clock</h1>
                <div className="row">
                    <div className="label">
                        <p id="break-label">Break Length</p>
                        <i className="fa fa-arrow-down" id="break-decrement" onClick={this.breakDecrement}></i>
                        <span id="break-length">{break_length}</span>
                        <i className="fa fa-arrow-up" id="break-increment" onClick={this.breakIncrement}></i>
                    </div>

                    <div className="label">
                        <p id="session-label">Session Length</p>
                        <i className="fa fa-arrow-down" id="session-decrement" onClick={this.sessionDecrement}></i>
                        <span id="session-length">{session_length}</span>
                        <i className="fa fa-arrow-up" id="session-increment" onClick={this.sessionIncrement}></i>
                    </div>
                </div>
                <div className="time-wrapper" style={styleTimeWrapper}>
                    <div id="timer-label">{timer_label}</div>
                    <div id="time-left">{this.toTimeFomat(time_left)}</div>
                </div>
                <div className="time-control">
                    <i className={iconPause} id="start_stop" onClick={this.isRunning}></i>
                    <i className="fa fa-refresh" id="reset" onClick={this.reset}></i>
                </div>
                <div className="author">
                    <p>Designed and Coded by</p>
                    <span>Nhat Minh</span>
                </div>
                <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={audio => this.audioBeep = audio}></audio>
            </div>

        );
    }
}

export default Clock;