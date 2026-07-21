// components/TextCaptchaForm.tsx
import React, { useEffect, useState } from "react";

const TextCaptchaForm = ({message, setUserInput, userInput, setRefreshId}: {message: string, setUserInput: (value: string) => void, userInput: string, setRefreshId: (value: string) => void}) => {
  const [captchaSvg, setCaptchaSvg] = useState("");
  // const [refreshId, setRefreshId] = useState("");

  const fetchCaptcha = () => {
    fetch("/api/captcha")
      .then((res) => res.json())
      .then((data) => {
        setCaptchaSvg(data.data);
        setRefreshId(data.refreshId);
        console.log(data.refreshId,"data.refreshId");
      });
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleRefresh = () => {
    fetchCaptcha();
  };

  return (
    <>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="txtCaptcha"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter Captcha*"
        />
        <small className="ir-error">*Enter valid Captcha</small>
      </div>
      <div className="form-group">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div dangerouslySetInnerHTML={{ __html: captchaSvg }} />
          <button 
            type="button" 
            className="btn btn-link" 
            onClick={handleRefresh}
            style={{ marginLeft: '10px' }}
          >
            <i className="fa fa-refresh"></i>
          </button>
        </div>
        <p>{message}</p>
      </div>
    </>
  );
};

export default TextCaptchaForm;
