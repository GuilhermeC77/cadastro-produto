function afterProcessCreate(processId){
	var descricao = hAPI.getCardValue("B2_descricao");
	var codigo = hAPI.getCardValue("B1_codProduto");
	hAPI.setCardValue("numeroSolicitacao", processId);
	hAPI.setCardValue("identificador", codigo + " - " + descricao);
}