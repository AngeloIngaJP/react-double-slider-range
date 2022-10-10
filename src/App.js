import { useEffect, useRef, useState } from "react";

function App() {
  const [sliderRange, setSliderRange] = useState({
    rangeMin: 2500,
    rangeMax: 7500
  });
  const ref = useRef([]);
  const refProgress = useRef(null);
  let gap = 1000;

  useEffect(() => {
    ref.current.forEach((input) => {
      input.addEventListener("input", (e) => {
        const inputClass = e.target.className;

        let minVal = parseInt(ref.current[0].value);
        let maxVal = parseInt(ref.current[1].value);

        if (maxVal - minVal < gap) {
          if (inputClass === "range-min") {
            setSliderRange({ rangeMin: maxVal - gap, rangeMax: maxVal });
          } else {
            setSliderRange({ rangeMin: minVal, rangeMax: minVal + gap });
          }
        } else {
          setSliderRange({ rangeMin: minVal, rangeMax: maxVal });

          refProgress.current.style.left =
            (minVal / ref.current[0].max) * 100 + "%";
          refProgress.current.style.right =
            100 - (maxVal / ref.current[1].max) * 100 + "%";
        }
      });
    });
  }, [gap]);

  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h2>Double Slider</h2>
          <p>Use the slider to set the min and max value</p>
        </header>
        <div className="price-input">
          <div className="field">
            <span>Min</span>
            <input
              type="number"
              className="input-min"
              value={sliderRange.rangeMin}
              readOnly
            />
          </div>
          <div className="separator">-</div>
          <div className="field">
            <span>Max</span>
            <input
              type="number"
              className="input-max"
              value={sliderRange.rangeMax}
              readOnly
            />
          </div>
        </div>
        <div className="slider">
          <div ref={refProgress} className="progress"></div>
        </div>
        <div className="range-input">
          <input
            ref={(el) => (ref.current[0] = el)}
            type="range"
            className="range-min"
            min="0"
            max="10000"
            value={sliderRange.rangeMin}
            step="100"
            readOnly
          />
          <input
            ref={(el) => (ref.current[1] = el)}
            type="range"
            className="range-max"
            min="0"
            max="10000"
            value={sliderRange.rangeMax}
            step="100"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;
