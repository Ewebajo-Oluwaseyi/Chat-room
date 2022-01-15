declare namespace App {
    interface Request {
        id: string;
        user_id: string;
        created_at?: string;
        updated_at?: string;
        title: string;
        category: string;
        status?: string;
        description: string
    }
    
    interface Profile {
        id: string;
        name: string;
        username: string;
    }

    interface Comment {
        id: string;
        user_id: string;
        created_at: string;
        updated_at: string;
        request_id: string;
        content: string;
    }

    interface Liked {
        id: string;
        user_id: string;
        created_at: string;
        updated_at: string;
        request_id: string; 
        like: string;
    }

    interface Reply {
        id: string;
        user_id: string;
        created_at: string;
        updated_at: string;
        request_id: string;
        content: string;
    }
}

