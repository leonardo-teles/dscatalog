import React, { useState } from 'react';
import { ReactComponent as UploadPlaceholder } from 'core/assets/imagens/upload-placeholder.svg';

import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';

const UploadImagem = () => {

    const [progressoUpload, setProgressoUpload] = useState(0);
    
    const onUploadProgress = (progressEvent: ProgressEvent) => {
        const progressoCarregamento = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        setProgressoUpload(progressoCarregamento);
    }
    
    const upload = (imagemSelecionada: File) => {
        const payload = new FormData();
        payload.append('arquivo', imagemSelecionada);

        makePrivateRequest({
            url: '/produtos/imagem', 
            method: 'post',
            data: payload,
            onUploadProgress
        })
        .then(() => {
            console.log('arquivo enviado com sucesso');
        })
        .catch(() => {
            toast.error('Erro ao enviar arquivo');        
        })
        .finally(() => setProgressoUpload(0))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const imagemSelecionada = event.target.files?.[0];

        if(imagemSelecionada) {
            upload(imagemSelecionada);
        }
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className="container-botao-upload">
                    <input 
                        type="file"
                        id="upload"
                        accept="image/png, image/jpg"
                        onChange={handleChange}
                        hidden
                    />
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="texto-upload text-primary">
                    As imagens devem ser JPG ou PNG e não devem ultrapassar <strong>5 MB.</strong>
                </small>
            </div>
            <div className="col-6 upload-placeholder">
                <UploadPlaceholder />
                <div className="container-progresso-upload">
                    <div className="progresso-upload" style={{ width: `${progressoUpload}%` }}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadImagem;