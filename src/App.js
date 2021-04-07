import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
// import App from './App';
import Quotes from './components/Quotes';
import React,{ Component, Fragment } from 'react';
import './App.css';
import {Container, Row, Button, DropdownButton, Dropdown, Col } from 'react-bootstrap';
import { LaunchCard } from './components/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

test('displays a quote', () => {
  render(<App />);
  const quote = document.querySelector('#text p');
  expect(quote).toBeInTheDocument();
  expect(quote).not.toBeEmptyDOMElement();
});

it('calls generateRandomQuote prop function when next button is clicked', () => {
  const generateRandomQuoteFn = jest.fn();
  const quote = mount(
    <Quotes generateRandomQuote={generateRandomQuoteFn} quote={{}} />
  );
  const generateBtn = quote.find('#new-quote');

  generateBtn.simulate('click');
  expect(generateRandomQuoteFn).toHaveBeenCalledTimes(1);
});

class App extends Component{
  constructor(){
    super();

    this.state = {
      launches: [],
    }
  }

  componentDidMount() {
    fetch("https://api.spaceXdata.com/v3/launches?limit=100")
      .then((res) => res.json())
      .then(json => {
        this.setState({
          launches:json, 
        })
      });
  }

  defaultCall = () => {
    fetch("https://api.spaceXdata.com/v3/launches?limit=100")
      .then((res) => res.json())
      .then(json => {
        this.setState({
          launches:json, 
        })
      });
      this.render()
  };

  launchSuccess = () => {
    fetch("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true")
      .then((res) => res.json())
      .then(json => {
        this.setState({
          launches:json, 
        })
      });
      this.render()
  }

  launchLandSuccess = () => {
    fetch("https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true")
      .then((res) => res.json())
      .then(json => {
        this.setState({
          launches:json, 
        })
      });
      this.render()
  }

  handleDropDown = (event) => {
    var str = String(event)
    var apiCall = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year="+str;
    console.log(apiCall)
    fetch(apiCall)
      .then((res) => res.json())
      .then(json => {
        this.setState({
          launches:json, 
        })
      });
      this.render()
  }

  render(){
    return (
      <div style={{ background: `url('${process.env.PUBLIC_URL}/space_dark.jpg')`}}>
        <h1 className="centerAlign">SpaceX Launches</h1> 
        <Container style={{marginBottom:"20px"}}>
          <h3 style={{color:"#ff9436",paddingTop:"20px"}}>Filters: </h3>
          <div style={{marginTop:"20px",marginLeft:"10px"}}>
            <Button variant="secondary" style={{ margin:"5px"}} onClick={this.defaultCall}>All</Button>
            <Button variant="secondary" style={{ margin:"5px"}} onClick={this.launchSuccess}>Successful Launch</Button>
            <Button variant="secondary" style={{ margin:"5px"}} onClick={this.launchLandSuccess}>Successful Launch and Land</Button>
            <DropdownButton variant="secondary" style={{margin:"5px"}} title="Successful Launch Year" id="bg-nested-dropdown" onSelect={this.handleDropDown}>
              <Dropdown.Item eventKey="2014">2014</Dropdown.Item>
              <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
              <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
              <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
              <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
              <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
              <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
              <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
            </DropdownButton>
          </div>
          </Container>
        <Container>
          <h3 style={{color:"#ff9436",marginBottom:"20px"}}>List of Rockets: </h3>
          <Row>
          {this.state.launches.map((launch) => (
            <LaunchCard key={launch.flight_number} launch={launch}/>
          ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
