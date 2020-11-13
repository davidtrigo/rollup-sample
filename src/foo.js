import {LitElement, html, css} from 'lit-element';
import bar from './bar.js';
import fooCSS from './foo.css';

class XFoo extends LitElement{
    static get styles(){
        return fooCSS;
    }
    static get properties(){
        return {
            show: {type: Boolean}
        }
    }
    _renderBaz(){
        if(!this.show){
            return null;
        }
        import('./baz')
        return html`<x-baz></x-baz>`
    }
    render(){
        return html`
            <h1>Hello  a${bar}</h1>
            <h2>El endpoint de la api es ${API_ENDPOINT}</h2>
            ${this._renderBaz()}
        `
    }
}

customElements.define('x-foo', XFoo);