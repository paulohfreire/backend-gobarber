interface ITemplateVariables {
    [key: string]: string | number;        //Cria-se a interface pois não se sabe quais são as variáveis ainda - é algo dinâmico
  }
  
  export default interface IParseMailTemplateDTO {
    file: string;
    variables: ITemplateVariables; 
  }