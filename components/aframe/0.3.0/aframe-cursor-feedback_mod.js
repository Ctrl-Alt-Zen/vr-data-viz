/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Cursor Feedback
 */
AFRAME.registerComponent('cursor-feedback', {
    schema: {
        property: { default: 'scale' },
        dur: { default: '300' },
        to: { default: '2 2 2' },
    },

    multiple: false,

    init: function() {
        this.mouseenter = this.mouseenter.bind(this);
        this.mouseleave = this.mouseleave.bind(this);

        this.el.addEventListener('mouseenter', this.mouseenter);
        this.el.addEventListener('mouseleave', this.mouseleave);

        this.lastTarget = null;
        this.lastTargetId = null;
    },

    mouseenter: function(evt) {
        const data = this.data;
        const el = this.el; 
        const id = evt.detail.intersectedEl.id; 
        const target = evt.detail.intersectedEl;
        const isInteractive = !!target.dataset.interactive;
        if (isInteractive) {
            this.lastTarget = target;
            target.emit('lookat');
            console.log('mouseenter:', id);
        }
    },

    mouseleave: function(evt) {
        if (this.lastTarget !== null) {
            console.log('mouseleave:', this.lastTarget.id);
            this.lastTarget.emit('lookaway');
            this.lastTarget = null;
        }

    },

    remove: function() {
        this.el.removeAttribute('animation');
        this.el.removeEventListener('mouseenter', this.mouseenter);
        this.el.removeEventListener('mouseleave', this.mouseleave);
    },
});
