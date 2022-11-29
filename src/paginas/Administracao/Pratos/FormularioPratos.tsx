import { Button, TextField, Typography, Container, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";


const FormularioPratos = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IPrato>(`pratos/${parametros.id}/`)
        .then((resposta) => {
          setNomePrato(resposta.data.nome);
        });
    }
  }, [parametros]);

  const [nomePrato, setNomePrato] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http
        .put(`pratos/${parametros.id}/`, {
          nome: nomePrato,
        })
        .then(() => {
          alert("Prato atualizado com sucesso");
        });
    } else {
      http
        .post("pratos/", {
          nome: nomePrato,
        })
        .then(() => {
          alert("Prato cadastrado com sucesso!");
        });
    }
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            {/*Conteúdo da Página*/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography component="h1" variant="h6">
                Formulário de Pratos
              </Typography>
              <Box
                component="form"
                sx={{ width: "100%" }}
                onSubmit={aoSubmeterForm}
              >
                <TextField
                  value={nomePrato}
                  onChange={(evento) => setNomePrato(evento.target.value)}
                  label="Nome do Prato"
                  variant="standard"
                  fullWidth
                  required
                />
                <Button
                  sx={{ marginTop: 1 }}
                  type="submit"
                  fullWidth
                  variant="outlined"
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FormularioPratos;
