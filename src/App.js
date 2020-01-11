import React, {Component} from 'react';
import * as ml5 from 'ml5';

export default class App extends Component {
  state = {
    buttonText: 'Click',
    imageUrl: '',
    ready: false,
    predictionLabel: '',
    predictionConfidence: '',
    predicted: false,
  };

  loadImage = event => {
    const image = event.target.files[0];
    this.setState({
      imageUrl: window.URL.createObjectURL(image),
    });
    console.log(this.state.image);
  };

  classifyImage = async () => {
    const classifier = await ml5.imageClassifier('MobileNet');
    this.setState({ready: true});
    const image = document.getElementById('image');
    classifier.predict(image, 5, (err, results) => {
      this.setState({
        predictionLabel: results[0].label,
        predictionConfidence: results[0].confidence,
        predicted: true,
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Hello, lets try Machine Learning!</h1>
        <input className="center" type="file" accept="image/*" onChange={this.loadImage} />
        {this.state.imageUrl && (
          <div>
            <img
              id="image"
              className="center"
              src={this.state.imageUrl}
              alt="to be classified"
              height={500}
            />
            <button className="center" onClick={this.classifyImage}>
              Check result
            </button>
          </div>
        )}
        {this.state.predicted && (
          <p>
            The app is {Math.floor(this.state.predictionConfidence * 100)}% sure that this is{' '}
            {this.state.predictionLabel.split(',')[0]}.
          </p>
        )}
      </div>
    );
  }
}
