import { LitElement, html } from 'lit-element';
class XBaz extends LitElement {
    render() {
        return html`
            <h1>Bazaadad</h1>
        `
    }
}
customElements.define('x-baz', XBaz);