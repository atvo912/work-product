import {useState} from 'react';
import axios from 'axios';

const geneNames = ['PTCH1', 'POLD1', 'FANCL', 'VEGFA', 'CDK6', 'ARID1A', 'VHL', 'MYD88', 'ATR', 'ASXL1', 'BRCA2', 'POLE', 'KMT2D', 'ATM', 'JAK1', 'FANCA', 'PALB2', 'TSC2', 'ERBB2']

const chromosomeIds = ['X', 'Y'];
for (let i = 1; i <= 38; i++) {
  chromosomeIds.push(i.toString());
}

function Search(props) {
  const [gene, updateGene] = useState();
  const [chromosomeId, updateCID] = useState();
  const [start, updateStart] = useState();
  const [end, updateEnd] = useState();
  const [afCutoff, updateAFC] = useState();
  const [displayError, updateDE] = useState(false);

  const {updateData} = props;

  function handleChange(event) {
    event.preventDefault();

    let {name, value} = event.target;

    if (name === 'gene') {
      updateGene(value);
    }

    if (name === 'chromosomeId') {
      updateCID(value);
    }

    if (name === 'start') {
      updateStart(value);
    }

    if (name === 'end') {
      // validate input
      if (value >= start || start === undefined) {
        updateDE(false)
        updateEnd(value);
      } else {
        updateDE(true);
      }
    }

    if (name === 'afCutoff') {
      updateAFC(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios.get('http://localhost:3001/')
    .then(results => {
      console.log(results.data);
      let filteredData = results.data.filter((result, idx) => {
        // console.log(gene, chromosomeId, start, end, afCutoff);
        let isGeneMatching = gene === undefined || gene === result.GENE;
        let isCIDMatching = chromosomeId === undefined || chromosomeId.slice(chromosomeId.indexOf('r') + 1) === result.CHROM;
        let matchesStartEnd = (start === undefined || Number(result.POS) >= Number(start)) && (end === undefined || Number(result.POS) <= Number(end));
        let matchesAFC = (afCutoff === undefined) || Number(result.AF) <= Number(afCutoff);
        // console.log(idx, isGeneMatching, isCIDMatching, matchesStartEnd, matchesAFC);
        return isGeneMatching && isCIDMatching && matchesStartEnd && matchesAFC;
      });
      updateData(filteredData);
    })
  }

  return (
    <div id ="search">
      <form className = "search" onSubmit = {handleSubmit}>
        <label>
          Gene Name:
          <select name = "gene" onChange = {handleChange}>
            <option disabled selected>Select Gene</option>
            {geneNames.map((name, idx) => <option value = {name}>{name}</option>)}
          </select>
        </label>

        <label>
          Chromosome ID:
          <select name = "chromosomeId" onChange = {handleChange}>
          <option disabled selected>Select Chromosome ID</option>
            {chromosomeIds.map((id, idx) => <option value = {id}>{id}</option>)}
          </select>
        </label>

        <label>
          Chromosome Start:
          <input name = "start" type="number" onChange = {handleChange}/>
        </label>

        <label>
          Chromosome End:
          <input type="number" name="end" onChange = {handleChange}/>
          {displayError && <span className = "error">INVALID END SPECIFIED</span>}
        </label>

        <label>
          AF Cutoff (less than or equal to):
          <input type="number" name="afCutoff" onChange = {handleChange}/>
        </label>
        <input type="submit" value="Filtered Search" />
      </form>
    </div>
  );
}

export default Search;
