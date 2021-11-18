import * as S from './styles';
import { Photo } from '../../types/Photo';

type Props = {
  item: Photo;
  onDelete: (name: string) => void;
}

export const PhotoItem = ({ item, onDelete }: Props) => {
  return (
    <S.Container>
      <img src={item.url} alt={item.name} />
      {item.name}
      <button onClick={() => onDelete(item.name)}>Excluir</button>
    </S.Container>
  );
}