import React, { useState, useEffect } from "react"
import clipboardCopy from "clipboard-copy";

import { ReactComponent as Copy } from "../icons/ClipboardIcon.svg";
import { ReactComponent as Save } from "../icons/PageDownIcon.svg";

export default function UTF8Encoder() {


    
    const [inputValue, setinputValue] = useState('');
    const [outputValue, setoutputValue] = useState('');
    const [isError, setError] = useState(false);
    const [isClicked, setIsClicked] = useState(false);


    ///my code
    useEffect(() => {
        // Update output whenever inputvalue changes
        if(inputValue===''){
            setError(false)
            setoutputValue('');
        }
        else {
            try {
                setError(false);
                // const decodedUrl = decodeURIComponent(inputValue);
                const encodedBytes = new TextEncoder().encode(inputValue);
                const encodedText = String.fromCharCode.apply(null, encodedBytes);
                setoutputValue(encodedText);
              } catch (error) {
                // Handle invalid URL encoding
                setoutputValue('Invalid');
                setError(true);
              }



        }



       
      }, [inputValue]);

      const handleInputChange = (event) => {
        // Update input when textarea-input changes
        setinputValue(event.target.value);
      };


      const handlecopy = () => {
        // Your function logic here

        if(!isError && outputValue !=='' ){
            clipboardCopy(outputValue)
            console.log('Button clicked!');

            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
              }, 1000);

            

        }

      }


      const handleSaveToFile = () => {
        if (!isError && outputValue !=='' ) {
        
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
              }, 1000);
        
          const blob = new Blob([outputValue], { type: 'text/plain' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'Akto-url-decoder.txt';
          link.click();
        }
      }

      const styles = {
        textboxborder: {
          padding: '20px',
          borderRadius: "8px",
          border: '2px solid #b3b3b3',
          transition: 'border-color 0.5s ease-in-out'
        },
        text: {
          color: isError ? 'red' : 'green',
        },
        textboxborder2: {
            padding: '20px',
            paddingTop: '28px',
            borderRadius: "8px",
            // border: isClicked ? '2px solid #a366ff':'2px solid #b3b3b3',
            border: isError ? '2px solid #ff9999' : isClicked ? '2px solid #a366ff':'2px solid #b3b3b3',
            transition: 'border-color 2s ease-in-out',
            position: 'realtive',
            zIndex: 0
          }
      };

      const iconStyles = {
        position: 'absolute',
        top: '15%',
        right: '10px',
        transform: 'translateY(-50%)',
        display: (!isError && outputValue !=='')? '':'none'
        
      }
    


    return (

        <div>
            <h1>UTF-8 Encoder</h1>
            {/* <h3> Encode text to UTF-8 </h3> */}
        <div
            className="Polaris-Card"
            style={{
                padding: "0px",
                width: "100%",
                maxWidth: "100%",
                minHeight: "90vh",
                fontSize: "16px",
                borderRadius: "8px",
                border: "2px solid #E2E1E5",
            }}
        >
    
            
            <div style={{ display: "flex", height: '75vh' }} className="main-div">
                <div
                    style={{
                        flex: "2",
                        flexDirection: "column",
                        gap: "16px",
                        display: "flex",
                        padding: "20px",
                    }}
                    className="editor-div"
                >
            
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                        }}
                    >
                    
                        <div className="editor">

                        <div className="Polaris-Labelled__LabelWrapper">
                            <div className="Polaris-Label">
                            <label  className="Polaris-Label__Text"> Input </label>
                            </div>
                        </div>


                        <div className="Polaris-Connected">
                            <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                            <div className="Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline" style={{position: 'relative'}}>
                                <textarea         
                               
                                multiline="true"  value={inputValue} onChange={handleInputChange} placeholder="url goes here .." className="Polaris-TextField__Input  " spellCheck="false" type="text" rows="4"   style={styles.textboxborder}> </textarea>



                                <div aria-hidden="true" className="Polaris-TextField__Resizer">
                           


                                </div></div>
                                </div>
                                </div>




                                <br/>
                            
                           
                                <div className="Polaris-Labelled__LabelWrapper">
                                    <div className="Polaris-Label">
                                    <label  className="Polaris-Label__Text"> Output </label>
                                    </div>
                                </div>


                                <div className="Polaris-Connected">
                                    <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                    <div className="Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline" style={{position: 'relative'}}>
                                        <textarea multiline="true"  value={outputValue} placeholder="output comes here .. "  readOnly={true} className="Polaris-TextField__Input" spellCheck="false" type="text" rows="4"  style={styles.textboxborder2}></textarea>
                                        <div style={iconStyles} >
                                           
                                                <Copy onClick={handlecopy} className="copy"   style={{ height: "30px"}} alt="copy" />
                                            
                            
                                                <Save onClick={handleSaveToFile} className="save"  style={{ height: "30px" }} alt="save" />
                                            
                                        </div>
                                        <div aria-hidden="true" className="Polaris-TextField__Resizer">
                
                                        </div></div>
                                        </div>
                                        </div>
                                        <div
                style={{
                    
                    paddingTop: "30px",
                    width: "100%",
                }}
            >
                <img
                    src="https://akto-setup.s3.amazonaws.com/templates/128x128.png"
                    alt="Akto.io"
                    style={{ height: "30px" }}
                />

            </div>


                            </div>
                            </div>
                            </div>




                   
                   
                <div  className="hide-on-phone"
                    style={{
                        flex: "0.4", 
                        borderLeft: "1px solid #E2E1E5",
                        padding: "12px",
                        display: "flex",
                        height: '100%',
                       
                    }} 
                    
                    >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            width: "100%",
                        }}
                    >
                        

                        
                    </div>
                </div>
            </div>

          
        </div>
        </div>
    )
}