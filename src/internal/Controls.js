import "./Controls.css";

export const FORCE_ERROR_STORAGE_KEY = "FORCE_ERROR";

export function Controls() {
  const onChange = (e) => {
    const { value } = e.target;
    console.log("change");
    if (value === "on") {
      window.localStorage.setItem(FORCE_ERROR_STORAGE_KEY, true);
    } else {
      window.localStorage.removeItem(FORCE_ERROR_STORAGE_KEY);
    }
    window.location.reload();
  };

  const isOn = Boolean(window.localStorage.getItem(FORCE_ERROR_STORAGE_KEY));

  return (
    <div className="controls-container">
      <div className="title">Force Error</div>
      <div>
        <div className="radio-option">
          <input
            defaultChecked={!isOn}
            id="off"
            type="radio"
            name="error"
            value="off"
            onChange={onChange}
          />
          <label htmlFor="off">False</label>
        </div>
        <div className="radio-option">
          <input
            defaultChecked={isOn}
            id="on"
            type="radio"
            name="error"
            value="on"
            onChange={onChange}
          />
          <label htmlFor="on">True</label>
        </div>
      </div>
    </div>
  );
}
