/**
 *按队列加载模块
 */
seajs.queue(['jquery', 'class', 'class.event', 'class.log','jquery.ext','prototype','color','util'], function(require, exports, module) {
	//require不支持动态加载
    var touch = require('touch');

    classjs.debug = true;

    classjs.log.setConfig({
        time: false,
        type: false
    });

    classjs({
        className: 'ui.draw',
        //当引入class.event.js时才能继承事件机制
        extendEvent: true,
        //给类增加静态属性或方法，可通用ui.widget.css访问
        colorArray: ['#AF0', '#0AF', '#FA0', '#0A1', '#A10', '#1A0'],
        init: function(config) {
            this.override(config);

            this.render = this.render || document.body;
            this.$elem = $('<canvas class="x-ui-canvas"> Your browser does not support the HTML5 canvas tag.</canvas>');

            this.$render = $(this.render);

            this.$render.append(this.$elem);

            this.elem = this.$elem[0];

            this.canvas = this.elem.getContext("2d");

            this.initEvents();

            this.setSize();
        },
        ready: function() {
            classjs.log();
        },
        initEvents: function() {

            var $elem = this.$render,
                me = this;
            $elem.on('touchstart', {
                $owner: me
            }, function(event) {
                return event.data.$owner.trigger('drawStart', event.originalEvent);
            });
            $elem.on('touchmove', {
                $owner: me
            }, function(event) {
                return event.data.$owner.trigger('draw', event.originalEvent);
            });
            $elem.on('touchend', {
                $owner: me
            }, function(event) {
                return event.data.$owner.trigger('drawOver', event.originalEvent);
            });

            /*
            $(window).on('resize', {
                $owner: me
            }, function(event) {
                return event.data.$owner.trigger('resize', event);
            });
            */


        },
        /*
         *{
         *  startX : startX,
         *  startY : startY,
         *  endX : endX,
         *  endY : endY,
         *  radiusX : radiusX,
         *  radiusY : radiusY,
         *  opacity : opacity   
         *}
         */
        drawLine: function(line) {
            classjs.log();

            var canvas = this.canvas;
            canvas.strokeStyle = this.getColor(line.opacity);
            canvas.beginPath();
            canvas.moveTo(line.startX - 5, line.startY - 5);
            canvas.lineTo(line.endX + 5, line.endY + 5);
            canvas.stroke();
        },
        /*
         *{
         *  startX : startX,
         *  startY : startY,
         *  endX : endX,
         *  endY : endY,
         *  radiusX : radiusX,
         *  radiusY : radiusY,
         *  opacity : opacity   
         *}
         */
        drawPoint: function(point) {
            classjs.log();
            var canvas = this.canvas;
            canvas.fillStyle = this.getColor(point.opacity);
            canvas.beginPath();
            canvas.arc(point.endX, point.endY, point.radiusX || 5, 0, Math.PI * 2, true);
            canvas.fill();


            this.emit('drawPoint', point);
        },
        getColor: function(alpha) {
            classjs.log();

            var i = Math.randomInt(this.colorArray.length),
                color = this.colorArray[i];
            if (util.isNumeric(alpha)) {
                color = Color.hexToRGB(color);
                color.a = alpha;
                color = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + alpha + ')'
            }
            return color;

        },
        onResize: function(event) {
            this.setSize();
        },
        setSize: function() {
            var canvasElem = this.elem;
            canvasElem.width = window.innerWidth;
            canvasElem.height = window.innerHeight;
        },
        onDrawStart: function(event) {
            classjs.log();
            this.onDraw(event);
            return false;
        },
        onDraw: function(event) {
            classjs.log();
            var events = event.touches;
            classjs.each(events, function(i, e) {
                this.drawPoint({
                    startX: e.clientX,
                    startY: e.clientY,
                    endX: e.clientX,
                    endY: e.clientY,
                    radiusX: e.radiusX,
                    radiusY: e.radiusY,
                    opacity: e.force
                });
            }, this);
            return false;
        },
        onDrawOver: function(event) {
            classjs.log();
            this.isDraw = false;
            return false;
        }
    });



    classjs({
        className: 'ui.widget',
        //当引入class.event.js时才能继承事件机制
        extendEvent: true,
        singleton: true
    });


    setTimeout(function() {
        ui.widget.destroy();
    }, 1000)


    var draw = new ui.draw({
        onDrawStart: function(event) {
            classjs.log();
            this.onDraw(event);
            return false;
        }
    });
    draw.on('drawPoint', function(event) {
        classjs.log();
    });


});
