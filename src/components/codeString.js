var jsonObject = {
  "swagger" : '{{objectId()}}',
  friends:[
  "{{repeat(3)}}",
  {
  	id:"{{index()}}",
    name:"{{firstName()}} {{surname()}}"
  }
  ],
  "swagger1" : '{{objectId()}}',
  friends1:[
  "{{repeat(3)}}",
  {
  	id:"{{index()}}",
    name:"{{firstName()}} {{surname()}}"
  }
  ],
  "swagger2" : '{{objectId()}}',
  friends2:[
  "{{repeat(3)}}",
  {
  	id:"{{index()}}",
    name:"{{firstName()}} {{surname()}}"
  }
  ], 
  "swagger3" : '{{objectId()}}',
  friends3:[
  "{{repeat(3)}}",
  {
  	id:"{{index()}}",
    name:"{{firstName()}} {{surname()}}"
  }
  ], 
  "swagger4" : '{{objectId()}}',
  friends4:[
  "{{repeat(3)}}",
  {
  	id:"{{index()}}",
    name:"{{firstName()}} {{surname()}}"
  }
  ],
  "swagger5" : '{{objectId()}}',
  friends5:[
  "{{repeat(3)}}",
  {
  	id:"{{index()}}",
    name:"{{firstName()}} {{surname()}}"
  }
  ],
  "swagger6" : '{{objectId()}}',
  friends6:[
  "{{repeat(3)}}",
  {
  	id:"{{index()}}",
    name:"{{firstName()}} {{surname()}}"
  }
  ],
  "swagger7" : '{{objectId()}}',
  friends7:[
  "{{repeat(3)}}",
  {
  	id:"{{index()}}",
    name:"{{firstName()}} {{surname()}}"
  }
  ]
}
let codeString= JSON.stringify(jsonObject,undefined,2);

export default codeString;
