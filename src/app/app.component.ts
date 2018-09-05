import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  submitted = false;

  // form group
  demoForm: FormGroup;

  // options value for select input
  options = [
    { id: 1, label: 'Value 1' },
    { id: 2, label: 'Value 2' }
  ];

  // radio group options
  radioOptions = [
    { id: 1, label: 'Radio Value 1' },
    { id: 2, label: 'Radio Value 2' }
  ];

  // checkbox group options
  multipleCheckboxesOptions = [
    { id: 1, label: 'Checkbox Value 1' },
    { id: 2, label: 'Checkbox Value 2' },
    { id: 3, label: 'Checkbox Value 3' }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.demoForm = this.formBuilder.group({
      // validation for required and email pattern
      simple_input: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/)]],
      // select input - validation for required
      select_input: ['', [Validators.required]],
      // radio group
      radio_group: ['', [Validators.required]],
      // checkbox group
      checkbox: ['', [Validators.required]],
      // new multiple checkboxes selection
      // initialize with an array of false values
      multiple_checkboxes: this.formBuilder.array(this.multipleCheckboxesOptions.map(x => false))
    });
  }

  get form() { return this.demoForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.demoForm.invalid) {
      return;
    }

    console.log(this.demoForm.value);

    // get selected options ids from the multiple checkbox group
    const selectedCheckboxesIds = this.multipleCheckboxesOptions
      .filter((option, index) => this.demoForm.controls.multiple_checkboxes.value[index])
      .map(option => option.id);

    console.log('Selected options ids:', selectedCheckboxesIds);
  }

  areCheckboxSelected() {
    const selectedValues: boolean[] = this.demoForm.controls.multiple_checkboxes.value;
    return selectedValues.filter(sv => sv === true).length > 0;
  }

}
