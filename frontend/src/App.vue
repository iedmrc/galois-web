<template>
  <div id="app">
    <h1>Project Galois</h1>
    <div id="intro">
      <p>
        <b>Galois</b> is an auto code completer for code editors (or any text editor) based on <a href="https://github.com/openai/gpt-2">OpenAI GPT-2</a>.
        It is trained (finetuned) on a curated list of approximately 45K Python (~470MB) files gathered from the Github.
        It is now just works properly on Python but not bad at other languages (thanks to GPT-2's power). You can play with it by the editor below.
      </p>
      <p>
        With this project, I aim to create a <b>Deep Learning Based Autocompleter</b> such that anyone can run it on their own computer easily.
        Thus, coding will be more easier and fun! Let's democratize this revolution in NLP, together!
      </p>
      <p>
        The trained (finetuned) model, the autocompleter backend and this page are released under MIT license on their Github pages.
        Feel free to fork the repository on <a href="https://github.com/iedmrc/galois-autocompleter"> Github</a> or contact me on <a href="https://twitter.com/iedmrc">Twitter</a>. 
      </p>
    </div>
      <prism-editor v-model="code" :emitEvents="true" language="python" :line-numbers="lineNumbers" class="editor" />
  </div>
</template>

<script>

import PrismEditor from "vue-prism-editor";
import Tribute from "tributejs";

let timer;

var tribute = new Tribute({
  // trigger: " ",
  values: (text, callback) => {
    clearTimeout(timer)
    timer = setTimeout(requestValues, 370, text, callback);
  },
  allowSpaces: true,
  replaceTextSuffix: '',
  positionMenu: true,
  autocompleteMode: true,
  });


let requestValues = async (text, callback) => {
let fulltext = document.getElementsByClassName('prism-editor__code')[0].textContent.trimRight("\n");

  let response = await fetch(`${process.env.VUE_APP_BACKEND_API}/api/complete`, {
    method: 'POST',
    // mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'client',
    body: JSON.stringify({"text":fulltext})
  })

  response = await response.json();

  let values = []
  for (let value of response.result){
    values.push({key:text+value, value:text+value})
  }

  callback(values);
}

export default {
  name: "App",
  data(){
    return {
      code: null,
      lineNumbers: true,
      language: 'python'
    }
  },
  mounted(){
tribute.attach(document.getElementsByClassName('prism-editor__code'));
  },
  components: {
    PrismEditor

  },
  methods: {
    // change:  (code) => {
    // }
  }
};
</script>

<style>
.editor{
  height: 60vh !important;
}
#intro {
font-size: 13pt;
color:#311258;
}
#intro a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
#intro a:hover {
  text-decoration: underline;
}
#intro b {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
#app {
  max-width:94%;
  margin: 80px auto 0 auto;
}
body {
  background: linear-gradient(to right, #a146fc, #3f5efb);
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
}
.v-tribute {
  width: 100%;
}
.tribute-container {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(#000, 0.13);
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(#000, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  color: #3f5efb;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #3f5efb;
  color: #fff;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
