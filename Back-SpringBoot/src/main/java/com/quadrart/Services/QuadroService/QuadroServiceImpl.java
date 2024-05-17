package com.quadrart.Services.QuadroService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quadrart.Models.Quadro.Quadro;
import com.quadrart.Repositories.QuadroRepository;

@Service
public class QuadroServiceImpl implements QuadroService{

    /*
     * QuadroRepository para se ter acesso a funções
     * que interagem com a base de dados.
     * 
     */
    @Autowired
    private QuadroRepository quadroRepository;
    

    /*
     * Retorna todos os quadros contidos na tabela quadros
     */
    @Override
    public List<Quadro> getAllQuadros() {
        return quadroRepository.findAll();
    }

    /*
     * Recebe um id, e retorna o quadro da bases de dados que
     * contém o id recebido
     */
    @Override
    public Optional<Quadro> getQuadro(Long id) {
        return quadroRepository.findById(id);
    }

    /*
     * Recebe um quadro, e o cria na base de dados.
     */
    @Override
    public Quadro createQuadro(Quadro quadro) {
        return quadroRepository.save(quadro);
    }

    /*
     * Atualiza o quadro na basse de dados, recebendo um id
     * e os dados que vão ser atualizados no quadro.
     * 
     * Inicialmente, se pesquisa um quadro pelo id recebido.
     * Como a função pode não retornar nada, é necessário
     * se utilizar o objeto Optional<Quadro>; Caso o quadro tenha
     * sido retornado, o quadro existe, logo é salvo.
     * Caso o quadro não tenha sido retornado, o quadro a ser
     * atualizado não existe, e logo, um erro é gerado.
     */

    @Override
    public Quadro atualizarQuadro(Long id, Quadro quadro) {
        Optional<Quadro> existingQuadro = quadroRepository.findById(id);

        if (existingQuadro.isPresent()){
            quadro.setId(id);
            return quadroRepository.save(quadro);
        } else {
            throw new RuntimeException("Quadro não encontrado com id: " + id);
        }
    }

    /*
     * Inicialmente recebe-se o id do quadro a ser deletado,
     * e após isso o quadro é deletado e se retorna uma string
     * informando que a operação foi efetuada com sucesso.
     */
    @Override
    public String deleteQuadro(Long id) {
        quadroRepository.deleteById(id);
        return "Quadro com id: %s deletado com sucesso".formatted(id); 
    }
    
}
