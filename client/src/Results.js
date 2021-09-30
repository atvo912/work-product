function Results(props) {
  return (
    <div id ="results">
      <br></br>
      {props.data.map((element, idx) => {
        let {AF, ALLELE, ALT, CHROM, DP, EFFECT, FILTER, GENE, IMPACT, POS, REF, VF} = element;
        return (
        <div className = "result">
          <span>CHROM: {CHROM}</span>
          <span>POS: {POS}</span>
          <span>REF: {REF}</span>
          <span>ALT: {ALT}</span>
          <span>FILTER: {FILTER}</span>
          <span>AF: {AF}</span>
          <span>VF: {VF}</span>
          <span>DP: {DP}</span>
          <span>ALLELE: {ALLELE}</span>
          <span>EFFECT: {EFFECT}</span>
          <span>IMPACT: {IMPACT}</span>
          <span>GENE: {GENE}</span>
        </div>)
      })}
    </div>
  );
}

export default Results;
