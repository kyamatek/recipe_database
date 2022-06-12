import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import logo from './logo.svg';
import './App.css';
import { db } from './dexie';
import { useLiveQuery } from "dexie-react-hooks"; // Dexie.jsのReact用Hooks
import { Input } from './Input';

export interface IFormValues {
  'First Name': string;
  'Last Name': string;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <FormTest/>
        <ClearButton/>
        <GetAll/>
      </header>
    </div>
  );
}

function FormTest() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    // alert(JSON.stringify(data));
    addData(data['First Name'], data['Last Name']);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="First Name" register={register} required /><br/>
      <Input label="Last Name" register={register} required /><br/>
      <input type="submit" className="addData" value="Add Data"/>
    </form>
  )
}

function ClearButton() {
  const count = 999;
  return <span className="clearData" onClick={clearData}>Clear Data</span>
}


function GetAll() {
  const contents = useLiveQuery(
    () => db.contacts.toArray()
  ) || [];
  return (
    <span className="testGet">
      {contents.map((contents) => (
        <p key={contents.first}>
          {contents.id}: {contents.first}: {contents.last}
        </p>
      ))}
    </span>
  )

}

function addData(fisrtName: string, lastName: string) {
  db.contacts.put({first: fisrtName, last: lastName});
  // db.table("contacts").put({first: "First name", last: "Last name"});
}

function clearData() {
  db.contacts.clear();
  // db.table("contacts").put({first: "First name", last: "Last name"});
}

export default App;