import { useState, useEffect, FormEvent } from 'react';
import * as S from './App.styles';
import * as PhotosService from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './Components/PhotoItem'

const App = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setLoading(true);
    setPhotos(await PhotosService.getAll());
    setLoading(false);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      let duplicateImage = await PhotosService.imageDuplicate(file);
      if (duplicateImage instanceof Error) {
        alert(`${duplicateImage.message}`);
      } else {
        let result = await PhotosService.insert(file);
        if (result instanceof Error) {
          alert(`${result.name} - ${result.message}`);
        } else {
          let newPhotoList = [...photos];
          newPhotoList.push(result);
          setPhotos(newPhotoList);
        }
      }
      setUploading(false);

    } else {
      alert('Nenhuma imagem foi selecionada');
    }
    resetForm(e);
  }

  const resetForm = (e: FormEvent<HTMLFormElement>) => {
    const resetInput = e.target as unknown as Array<any>;
    resetInput[0].value = '';
    console.log(resetInput[0]);
  }

  const handleDelete = async (name: string) => {
    await PhotosService.deletePhoto(name);
    getPhotos();
  }

  return (
    <S.Container>
      <S.Area>
        <S.Header>Galeria de Fotos</S.Header>

        <S.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && "Enviando..."}
        </S.UploadForm>

        {loading &&
          <S.ScreenWarning>
            <div className='emoji'>🤨🤚</div>
            <div>Carregando photos...</div>
          </S.ScreenWarning>
        }

        {!loading && photos.length > 0 &&
          <S.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} item={item} onDelete={handleDelete} />
            ))}
          </S.PhotoList>
        }

        {!loading && photos.length === 0 &&
          <S.ScreenWarning>
            <div className='emoji'>😕</div>
            <div>Ainda não há fotos cadastradas.</div>
          </S.ScreenWarning>
        }
      </S.Area>
    </S.Container>
  )
}

export default App;