import ZohoConnectAction from '@/actions/zoho-connect-action'
import { Button } from './ui/button'

export default async function ZohoConnection() {
    return (
        <form action={ZohoConnectAction}>
            <Button type="submit">Conectar con Zoho</Button>
        </form>
    )
}
