class SoundEvent {
    x: any;
    y: any;
    initX: any;
    initY: any;
    filter: BiquadFilterNode | null;
    sound: AudioBufferSourceNode | null;
    context: AudioContext;
    buffer: AudioBuffer;

    constructor( audioContext: AudioContext, audioBuffer: AudioBuffer) {
        this.x = 0
        this.y = 0
        this.initX = this.x;
        this.initY = this.y;
        this.filter = null
        this.sound = null;
        this.context= audioContext;
        this.buffer= audioBuffer;
    }

    setFilter(x: number,y: number) {
        if(this.filter === null) return
        var factor = 1.0 - ((y - this.initY) / (document.body.clientHeight - this.initY));

        if (factor < 0)
            factor = 0.0;
        if (factor > 1)
            factor = 1.0;
        var value = Math.pow(2, 13 * factor);
        this.filter.frequency.value = value;
        this.filter.Q.value = 40 * Math.min(1.0, Math.max(0.0, ((x - this.initX) / (document.body.clientWidth - this.initX))));
    }

    setupSound() {
        var sourceNode = this.context.createBufferSource();
        sourceNode.buffer = this.buffer;
        sourceNode.loop = true;
        this.filter = this.context.createBiquadFilter();

        sourceNode.connect(this.filter);
        this.filter.connect(this.context.destination);
        this.sound = sourceNode;

        console.log("starting sound")
        if(this.sound)
            this.sound.start(0)
    }

    stopSound() {
        if (this.sound)
            this.sound.stop(0);
        this.sound = null
    }
}


export default SoundEvent