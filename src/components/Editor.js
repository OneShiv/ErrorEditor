import React from "react";
import codeString from "./codeString";
import "./Editor.css";

let codeStringArray= codeString.split("\n");
console.log(codeStringArray.length);
let ErrorArray=[
  {line:1,
  msg:"message 1"
  },
  {line:3,
    msg:"message 2"
  },
  {line:7,
    msg:"message 3"
  }
];

let lineObject={};
ErrorArray.map(error =>{
  lineObject[error.line]=error.msg;
  return null;
});

let lineKeys = Object.keys(lineObject);
const generateCodeRowArray=(codeStringArray)=>{
  let lineno=1;
  let codeRowArray=codeStringArray.map((string,index)=>{
    return{
      string,
      lineno:lineno++,
      error:lineKeys.includes(String(index+1))? true:false,
      codeStringArray:codeStringArray,
      errorMessage: lineKeys.includes(String(index+1))? lineObject[index+1] : ""
    }
  });
  return codeRowArray;
}



class Editor extends React.Component{
  constructor(props){
    super(props);
    this.textInput=React.createRef();
    this.state={
      showError:false,
      codeStringArray:codeStringArray,
      currentMode:"read",
      codeRowArray:generateCodeRowArray(codeStringArray),
      jsonParseError:false
    };
  }
  componentDidMount(){
    var els = document.getElementsByClassName("pre-pre");
    for(let node_index=0;node_index<els.length;node_index++){
      els[node_index].addEventListener('click',(e)=>{
        let tar = e.currentTarget;
        let spanEl=tar.querySelector("span");
        if(!spanEl){ 
          var node = document.createElement("span");
          node.className="save-text";
          var textnode = document.createTextNode("save");
          node.appendChild(textnode);  
          tar.appendChild(node);
        } 
      });
    }
  }
  componentDidUpdate(){
    var scrollEl=document.getElementById("text-ed");
    if(scrollEl){
      scrollEl.addEventListener("scroll",function(e){
      let scroll = e.target.scrollTop;
      document.getElementById("nos").style.marginTop="-"+scroll+"px";
      });
    }
  }
  showErrorhandler = () =>{
    this.setState(()=>({
      showError:!this.state.showError
    }))
  }
  editHandler = () =>{
    this.setState({
      currentMode:"write"
    });
  }
  saveHandler = () =>{
    try{
      JSON.parse(this.state.codeStringArray.join("\n"));
      this.setState(()=>({
        codeRowArray:generateCodeRowArray(this.state.codeStringArray),
        jsonParseError:false,
        currentMode:"read"
      }));
    }catch(err){
      this.setState(()=>({
        jsonParseError:true
      }));
      console.log(err);
    }
  }
  inputHandler = (e) =>{
      let codeStringArray=e.target.value.split("\n");
      this.setState(()=>({
        codeStringArray:codeStringArray
      }));
  }
  render(){
    console.log(this.state);
    return(
      <div>
        {this.state.jsonParseError && <p> Error Occured Parsing JSON </p>}
        <div>
          <div style={{ "borderRadius":"8px","width":"60%","margin":"10px auto","backgroundColor":"#f7f8f9","padding":"16px 40px","maxHeight":"500px","overflowY":"scroll","border":"1px solid #ccc","boxShadow":"1px 1px 2px #ccc"}}>
            {this.state.codeRowArray.map((row,index)=>{
              return(
                <div key={row.lineno} style={{"backgroundColor":this.state.showError && row.error? "white":"inherit"}}>
                    <div className="pre-pre" style={{"display":"grid","gridTemplateColumns":"10% 90%","gridTemplateRows":"15px","fontSize":"11px"}}>
                      <div style={{"textAlign":(this.state.showError && row.error)?"center":"left",
                      "paddingLeft":"8px","color":(this.state.showError && row.error)?"white":"grey",
                      "backgroundColor":(this.state.showError && row.error)?"red":"inherit"}}><pre  style={{margin:"0px"}}>{row.lineno}</pre></div>
                      <div style={{"border-left":"1px solid black","textAlign":"left","paddingLeft":"2px","boxShadow": this.state.showError && row.error?"inset 0 0 2px #666":"none"}}><pre id={index} className={"pre-str"} contenteditable={this.state.currentMode==="write"?"true":"false"} style={{margin:"0px"}}>{row.string}</pre></div>
                    </div>
                    {this.state.showError && row.error && 
                      <div style={{"display":"grid","gridTemplateColumns":"10% 90%","gridTemplateRows":"16px","fontSize":"11px","padding":"10px 0","borderLeft":"1px solid red"}}>
                        <div style={{"textAlign":"right","color":"#666"}}>Cause :</div>
                        <div style={{"textTransform":"capitalize","textAlign":"left","paddingLeft":"16px","color":"red"}}>{row.errorMessage}</div>
                      </div>
                    }
                </div>
              );
            })
            }
        </div>
      </div>
      
      <div>
          <button disabled={this.state.currentMode==="write"?true:false} onClick={this.showErrorhandler}>{this.state.showError? "Hide Errors" :"Show Errors"}</button>
          {this.state.currentMode==="write" &&<button onClick={this.saveHandler}>Save</button>}
          {this.state.currentMode==="read" &&<button onClick={this.editHandler}>Edit</button>}
      </div>
      </div>
    );
  }
}

export default Editor;