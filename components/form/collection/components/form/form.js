import { h } from "@stencil/core/internal";
import { z } from "zod";
import tailwind from "../../output.css";
export class Form {
    constructor() {
        this.schema = z.object({
            fname: z.string().min(1, { message: 'First Name is required' }),
            lname: z.string().min(1, { message: 'Last Name is required' }),
            email: z.string().email({ message: 'Invalid email address' }),
            mobile: z.number().refine(value => /^\d{4,12}$/.test(value.toString()), {
                message: 'Invalid mobile number. It should be between 4 and 12 digits long.',
            }),
            age: z.number().min(18, { message: 'Must be at least 18 years old' }).max(99, { message: 'Must be less than 100 years old' }),
        });
        this.fnameInput = undefined;
        this.lnameInput = undefined;
        this.emailInput = undefined;
        this.mobileInput = undefined;
        this.ageInput = undefined;
        this.fnameError = true;
        this.lnameError = true;
        this.emailError = true;
        this.mobileError = true;
        this.ageError = true;
        this.disable = true;
    }
    componentDidLoad() {
        const shadowRoot = this.element.shadowRoot;
        if (shadowRoot) {
            const style = document.createElement('style');
            style.textContent = tailwind;
            shadowRoot.appendChild(style);
        }
    }
    onInputFname(event) {
        const value = event.target.value;
        const name = z.string().min(1, { message: 'First Name is required' });
        const result = name.safeParse(value);
        //this.nameErrorMessage.textContent = result.success ? '' : result.error.errors[0].message;
        this.fnameError = !result.success;
        this.disableButton();
    }
    onInputLname(event) {
        const value = event.target.value;
        const name = z.string().min(1, { message: 'Last Name is required' });
        const result = name.safeParse(value);
        //this.nameErrorMessage.textContent = result.success ? '' : result.error.errors[0].message;
        this.lnameError = !result.success;
        this.disableButton();
    }
    onInputEmail(event) {
        const value = event.target.value;
        const email = z.string().email({ message: 'Invalid email address' });
        const result = email.safeParse(value);
        //this.emailErrorMessage.textContent = result.success ? '' : result.error.errors[0].message;
        this.emailError = !result.success;
        this.disableButton();
    }
    onInputMobile(event) {
        const value = event.target.value;
        const mobile = z.number().refine(value => /^\d{4,12}$/.test(value.toString()), {
            message: 'Invalid mobile number. It should be between 4 and 12 digits long.',
        });
        const result = mobile.safeParse(Number(value));
        console.log(result);
        this.mobileError = !result.success;
        this.disableButton();
    }
    onInputAge(event) {
        const value = event.target.value;
        const age = z.number().min(18, { message: 'Must be at least 18 years old' }).max(99, { message: 'Must be less than 100 years old' });
        const result = age.safeParse(Number(value));
        //this.ageErrorMessage.textContent = result.success ? '' : result.error.errors[0].message;
        this.ageError = !result.success;
        this.disableButton();
    }
    onSubmitForm(event) {
        event.preventDefault();
        let fname = this.fnameInputEl.value;
        let lname = this.lnameInputEl.value;
        let email = this.emailInputEl.value;
        let mobile = Number(this.mobileInputEl.value);
        let age = Number(this.ageInputEl.value);
        let data = {
            fname,
            lname,
            email,
            mobile,
            age,
        };
        let result = this.schema.safeParse(data);
        if (result.success) {
            alert('Submit successful');
        }
        else {
            alert('Something went wrong');
        }
    }
    disableButton() {
        let fname = this.fnameInputEl.value;
        let lname = this.lnameInputEl.value;
        let email = this.emailInputEl.value;
        let mobile = Number(this.mobileInputEl.value);
        let age = Number(this.ageInputEl.value);
        let data = {
            fname,
            lname,
            email,
            mobile,
            age,
        };
        let result = this.schema.safeParse(data);
        if (result.success) {
            this.disable = false;
        }
        else {
            this.disable = true;
        }
    }
    render() {
        return (h("div", { key: '51b2d37b21df18bb0590db95aaaf9de45160a86c', class: "flex justify-center items-center" }, h("form", { key: '34010cea3118f28757e888bd93b90c4c5619ed2d', onSubmit: this.onSubmitForm.bind(this), class: "flex flex-col justify-center items-center border-2 border-black rounded-md p-4 lg:p-12 mt-24" }, h("div", { key: 'bbb76ed863d9dff481b3b7a926e8746518f5bf2b', class: "row" }, h("div", { key: 'cfc4b22125f73c7aa096d048c3fdf38edff09d5a', class: "card" }, h("input", { key: 'f061fb441d7ef172038c22475cae290391578dd8', class: { 'input-normal': true, 'input-error': this.fnameError }, type: "text", onInput: this.onInputFname.bind(this), value: this.fnameInput, ref: el => (this.fnameInputEl = el) }), h("label", { key: 'b1083ef5906a5fa636d8ef63274d1baf5a47044d', class: { 'label-normal': true, 'label-error': this.fnameError } }, "First name")), h("div", { key: '671aa142d65f982cb2b15d89cfddd3da5f6b0515', class: "card" }, h("input", { key: '34ff3488f9466540878671a0f7f0334326731b85', class: { 'input-normal': true, 'input-error': this.lnameError }, type: "text", onInput: this.onInputLname.bind(this), value: this.lnameInput, ref: el => (this.lnameInputEl = el) }), h("label", { key: '2a23f69d7142e8c7d4c14a3e0bb3b3cd8830bb23', class: { 'label-normal': true, 'label-error': this.lnameError } }, "Last name"))), h("div", { key: '12e0f265e2b0eb0f7ff618768dd9e57769e0e0e8', class: "row" }, h("div", { key: 'd2164270ab0df42070857271d906435f2ebd4d86', class: "card" }, h("input", { key: 'f1a8a4f1f592f44f7f22cdc416ba42d26fc29aad', class: { 'input-normal': true, 'input-error': this.emailError }, type: "text", onInput: this.onInputEmail.bind(this), value: this.emailInput, ref: el => (this.emailInputEl = el) }), h("label", { key: '74a6b117f018947ae9a4bc3392fde0604e120a0c', class: { 'label-normal': true, 'label-error': this.emailError } }, "Email")), h("div", { key: 'c47bfcd78e1df29dfdaf1ea582704bda00cc73c9', class: { 'flex': true, 'items-center': true, 'p-4': true, 'gap-3': true, 'input-normal': true, 'input-error': this.mobileError, 'card': true } }, h("rf-select-options", { key: 'fac334cbd10acb1ba7c121923c740a5ad38aa26f', class: 'absolute left-0 top-0 -translate-x-32 w-2 h-1 -translate-y-32 z-10' }), h("input", { key: '571d0d050970f1fac210ea1654c1d07220593b1c', type: "text", class: "w-3/4 outline-none ml-24", onInput: this.onInputMobile.bind(this), value: this.mobileInput, ref: el => (this.mobileInputEl = el) }), h("label", { key: '282c7170a298d12cbfe06a72646a86adfa2e457b', class: "label z-20" }, "Country"), h("label", { key: 'c0d181e3bec1d528a5d81650bce171255e870bf0', class: { 'label-mobilenumber': true, 'label-mobilenumber-error': this.mobileError } }, "Mobile number"))), h("div", { key: 'b0a31b08af843194d997448cf1d1e66cf18ead4a', class: "row" }, h("div", { key: 'f516b3b1154aad86616bb3538b714b6e8b04bb23', class: "card" }, h("input", { key: 'c2ea456e99ef5d569b2a89bce3462e8ff2014ec2', class: { 'input-normal': true, 'input-error': this.ageError }, type: "number", onInput: this.onInputAge.bind(this), value: this.ageInput, ref: el => (this.ageInputEl = el) }), h("label", { key: 'c8027c008fa97e0f2a1fb7a65c0ae93fde121261', class: { 'label-normal': true, 'label-error': this.ageError } }, "Age")), h("button", { key: 'e41789a7d55c42bc485645479a10b72a52434bc9', class: { 'btn': true, 'opacity-50': this.disable }, disabled: this.disable }, "SUBMIT")))));
    }
    static get is() { return "rf-form"; }
    static get encapsulation() { return "shadow"; }
    static get states() {
        return {
            "fnameInput": {},
            "lnameInput": {},
            "emailInput": {},
            "mobileInput": {},
            "ageInput": {},
            "fnameError": {},
            "lnameError": {},
            "emailError": {},
            "mobileError": {},
            "ageError": {},
            "disable": {}
        };
    }
    static get elementRef() { return "element"; }
}
//# sourceMappingURL=form.js.map
