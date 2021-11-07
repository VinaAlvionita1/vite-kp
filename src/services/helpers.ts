import Swal from 'sweetalert2';

const range = (param: string): number[] => {
  const split = param.split(',');
  let t = 1;
  let e = 0;
  let s = 0;
  const r = [];
  if (split.length === 1) {
    e = parseInt(split[0]);
    s = 0;
  }
  if (split.length >= 2) {
    s = parseInt(split[0]);
    e = parseInt(split[1]);
  }
  if (split.length === 3) {
    t = parseInt(split[2]);
  }
  for (let i = s; i < e; i += t) {
    r.push(i);
  }
  return r;
}

async function showConfirmDialog(message: string, title?: string) {
  const result = await Swal.fire({
    title: title || 'Apakah Anda yakin menghapus?',
    text: message,
    showCancelButton: true,
    icon: 'warning',
    confirmButtonText: 'Ya, saya yakin!',
    cancelButtonText: 'Batal'
  });
  if (result.isConfirmed) {
    return true;
  }
  return false;
}

export {
  showConfirmDialog, range
}